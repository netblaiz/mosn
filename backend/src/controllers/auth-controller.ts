import mongoose from 'mongoose'
import passport from '../config/passport'
import { Request, Response, NextFunction } from 'express'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

import AuthRepository from '../repositories/auth-repository'
import { Auth, AuthDoc } from '../models/auth-model'
import UserRepository from '../repositories/user-repository'
import { User, UserDoc } from '../models/user-model'
import { AuthenticationError } from '../helpers/errors/authentication-error'
import { UserError } from '../helpers/errors/user-error'
import { ResourceNotFoundError } from '../helpers/errors/resource-not-found-error'
import { InternalServerError } from '../helpers/errors/internal-server-error'

class AuthController {


//creates a new user
	public register = async(req: Request, res: Response): Promise<any> => {

//use startSession for transaction/rollback
		const session = await mongoose.startSession()
		session.startTransaction()

		try{

			const salt = await bcrypt.genSalt()
			req.body.password = await bcrypt.hash(req.body.password, salt)
			req.body.lastlogin = '2024-12-12'
			req.body.lastip = '192.168.100.1'
			req.body.qrcode = await bcrypt.hash(req.body.username, salt)
			req.body.userhash = await bcrypt.hash(req.body.username + req.body.password, salt)
			req.body.activationemailkey = await bcrypt.hash(req.body.username + req.body.password, salt)

//create auth record
			let auth = await AuthRepository.create(req.body)

//create user record with  a reference to auth record
			req.body.authid = auth._id		
			let user = await UserRepository.create(req.body)


//commit the transaction if both creations succeed

			await session.commitTransaction()
			session.endSession()

			const token = this.generateToken(auth)
		
			res.status(201).json({
				message: "User successfully created!",
				auth,
				user,
				token,
			})		

		} catch(error) {

			//Roll back all changes if any operation fails
			await session.abortTransaction()
			session.endSession()
			console.error("Error during registration: ",error)
			throw new InternalServerError()
		}
	}




//login an existing user *requires ./config/passport*
	public login = async(req: Request, res: Response, next: NextFunction): Promise<void> => {

//use passport local strategy to authenticate user
		passport.authenticate('local', { session: false }, (err: Error, auth: AuthDoc, info: string) => {
			if (err) return next(err)
			if (!auth) return res.status(401).json({ message: 'Invalid credentials!' })





//generate jwt token (payload sub includes { authId | role | isActivated | isBanned | isActive)
		const token = this.generateToken(auth)

		return res.json({ message: 'Login successfully', token  })
		}) (req, res, next)
	}



//view user info *user must be authorized*
	public viewuser = async(req: Request, res: Response, next: NextFunction): Promise<any> => {

		try {

			const userId = req.auth ? req.auth._id : null

			if(!userId) {

				res.status(400).json({ message: 'User ID not found in token' })
			}

			const auth = await AuthRepository.findByUserId(userId)

			if(!auth) throw new ResourceNotFoundError('User not found')
			if(auth) {

			const user = await UserRepository.find({ authid: auth._id })
			return user
			//res.status(201).json({ user }) 

			}
			
			//next()
		} catch(error) {
			next(error)
		}
	}




//method to generate new token
/**make private so method wont be manipulated to include sensitive info into payload */


private generateToken(auth: AuthDoc):
	string {
		const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key'

		const jwtPayLoad = { authId: auth._id, role: auth.role, isActivated: auth.activated, isBanned: auth.isbanned, isActive: auth.isactive }

			console.log(jwtPayLoad)

		const jwt_token = 'Bearer ' + jwt.sign(jwtPayLoad, SECRET_KEY, { expiresIn: '1h' } )

		return jwt_token
	}


/*

public changepassword = async(req: Request, res: Response): Promise<any> => {

		const { old_password, new_password } = req.body

		try {

			const user = this.viewuser(req, res,next)

			if(!user) {

				return res.status(401).json({ message: 'Authentication record not found' })
			}

			const isMatch = await bcrypt.compare(old_password, user.password)
			if(!isMatch) {

				return res.status(401).json({ message: 'Old password is incorrect' })
			}

			const salt = await bcrypt.genSalt()
			const newHashedPassword = await bcrypt.hash(new_password, salt)


			req.body.password = newHashedPassword
			//await user.save()


			//let auth = await AuthRepository.activateaccount(id, activated)

			res.json({ message: 'Password update successfully' })
	
		} catch(error) {
			//console.log(error)
			throw new InternalServerError()
		}
	}


*/

	public activateaccount = async(req: Request, res: Response, next: NextFunction): Promise<AuthDoc | null> => {

		try {

			const userId = req.auth ? req.auth._id : null

			if(!userId) {

				res.status(400).json({ message: 'User ID not found in token' })
				return null
			}
			let auth = await AuthRepository.update({ _id: userId }, {activated: true})

				return auth
	
		} catch(error) {
			console.log(error)
			throw new InternalServerError()
		}
	}

	 public activateaccountbyemail = async(req: Request, res: Response, next: NextFunction): Promise<void> => {

		try {

			const userId = req.auth ? req.auth._id : null

			if(!userId) {

				res.status(400).json({ message: 'User ID not found in token' })
				return
			}

			const user = await AuthRepository.findByUserId(userId)

			if(!user) {

				res.status(400).json({ message: 'Cannot find the account' })
				return
			}

			const emailkey = req.params.activationemailkey
			//const activationemailkey = activationemailkey

			if(emailkey != user.activationemailkey) {

				res.status(400).json({ message: 'Email key not valid' })
				return
			}


			if(user.activationemailkey) {
				res.status(400).json({ message: 'Oops! Your account had already been activated' })
				return
			}


			//let confirmkey = await AuthRepository
			let auth = await AuthRepository.update({activationemailkey: emailkey}, {activated: true})

				res.status(201).json({ message: 'Congratulations! Your account has been activated' })
	
		} catch(error) {
			console.log(error)
			throw new InternalServerError()
		}
	}



	public async getAuths(): Promise<AuthDoc[]> {

		return AuthRepository.getAll()
	}
}

export const authenticateToken = passport.authenticate('jwt', { session: false })

export default new AuthController()
import mongoose from 'mongoose'
import passport from '../config/passport'
import { Request, Response, NextFunction } from 'express'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

import UserRoleRepository from '../repositories/user-role-repository'
import { UserRole, UserRoleDoc } from '../models/user-role-model'
//import UserRepository from '../repositories/user-repository'
//import { User, UserDoc } from '../models/user-model'
import { AuthenticationError } from '../helpers/errors/authentication-error'
import { ResourceNotFoundError } from '../helpers/errors/resource-not-found-error'
import { InternalServerError } from '../helpers/errors/internal-server-error'

class UserRoleController {


//Add User to A Company with Roles
	public addUserToCompany = async(req: Request, res: Response): Promise<any> => {

		try{

		const { company_id, hotel_id } = req.params
		const { auth_id, role } = req.body

			const existingRole = await UserRoleRepository.find({ auth_id, company_id })
			if (existingRole) {

				return res.status(400).json({
					message: 'User already has a role in this company'
				})
			} 

			let newRole = await UserRoleRepository.create(req.body)
			return res.status(201).json({
				message: "User has been assigned a new role",
				newRole,
			})		

		} catch(error) {
			console.error("Error during registration: ",error)
			throw new InternalServerError()
		}
	}



//Add User to A Property { hotel | apartment etc} with Roles
	public addUserToHotel = async(req: Request, res: Response): Promise<any> => {

		const { company_id, hotel_id } = req.params
		const { auth_id, role } = req.body

		try{

			const existingRole = await UserRoleRepository.find({ auth_id, hotel_id })
			if (existingRole) {

				return res.status(400).json({
					message: 'User already has a role in this facility'
				})
			} 

			let newRole = await UserRoleRepository.create(req.body)
			return res.status(201).json({
				message: "User has been assigned added to the hotel successfully",
				newRole,
			})		

		} catch(error) {
			console.error("Error during registration: ",error)
			throw new InternalServerError()
		}
	}

//Fetch user and their roles in a company or hotel
	public getUsersInCompany = async(req: Request, res: Response): Promise<any> => {

		const { company_id } = req.params
		try{

			const userWithRoles = await UserRoleRepository.find({ company_id })
			res.status(200).json(userWithRoles)
		} catch(error) {
			console.error("Error getting user role: ",error)
			throw new InternalServerError()
		}
	}

/*



//login an existing user *requires ./config/passport*
	public login = async(req: Request, res: Response, next: NextFunction): Promise<void> => {

//use passport local strategy to authenticate user
		passport.authenticate('local', { session: false }, (err: Error, auth: AuthDoc, info: string) => {
			if (err) return next(err)
			if (!auth) return res.status(401).json({ message: 'Invalid credentials!' })





//generate jwt token (payload sub includes { authId | role | isActivated | isBanned | isActive)
		const token = this.generateToken(auth)

		return res.json({ token, message: 'Login successfully' })
		}) (req, res, next)
	}



//view user info *user must be authorized*
	public viewuser = async(req: Request, res: Response, next: NextFunction): Promise<any> => {

		try {

			const userId = req.auth ? req.auth._id : null

			if(!userId) {

				return res.status(400).json({ message: 'User ID not found in token' })
			}

			let auth = await AuthRepository.findByUserId(userId)

			if(!auth) throw new ResourceNotFoundError('User not found')
			if(auth) {
			let user = await UserRepository.find({ authid: auth._id })
			res.json({ user }) 
			}
			

			next()
		} catch(error) {
			next(error)
		}
	}




//method to generate new token
/**make private so method wont be manipulated to include sensitive info into payload


private generateToken(auth: AuthDoc):
	string {
		const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key'

		const jwtPayLoad = { authId: auth._id, role: auth.role, isActivated: auth.activated, isBanned: auth.isbanned, isActive: auth.isactive }

			console.log(jwtPayLoad)

		const jwt_token = 'Bearer ' + jwt.sign(jwtPayLoad, SECRET_KEY, { expiresIn: '1h' } )

		return jwt_token
	}




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




	public activateAccount = async(req: Request, res: Response): Promise<AuthDoc | null> => {

		try {

			let  id = req.body.id
			let activated = req.body.activated
			let auth = await AuthRepository.activateaccount(id, activated)

				return auth
	
		} catch(error) {
			console.log(error)
			throw new InternalServerError()
		}
	}



	public async getAuths(): Promise<AuthDoc[]> {

		return AuthRepository.getAll()
	}
*/
}


export default new UserRoleController()
import { generateFromEmail, generateUsername } from 'unique-username-generator'

import PropertyRepository from '../repositories/property-repository'
import { Property, PropertyDoc } from '../models/property-model'
//import UserRepository from '../repositories/user-repository'
//import { User, UserDoc } from '../models/user-model'
import { Request, Response, NextFunction } from 'express'
import { PropertyError } from '../helpers/errors/property-error'
import { ResourceNotFoundError } from '../helpers/errors/resource-not-found-error'
import { InternalServerError } from '../helpers/errors/internal-server-error'

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class PropertyController {

	public async register(req: Request, res: Response, next: NextFunction): Promise<any> {

		try{

			//include logged in user's ID as owner of company

			const ownerId = req.auth ? req.auth._id : null
			const role = req.auth ? req.auth.role : null
			const is_activated = req.auth ? req.auth.activated : null
			const is_banned = req.auth ? req.auth.isbanned : null
			const is_active = req.auth ? req.auth.isactive : null

			if(!ownerId) {

				return res.status(400).json({ message: 'User ID not found in token' })
			} 

			if(role != 'Admin') {

				return res.status(400).json({
					message: 'Sorry, you are not authorized to do this'
				})
			}

			if(is_activated != true) {

				return res.status(400).json({
					message: 'Please activate your account'
				})
			}

			if(is_banned != false) {

				return res.status(400).json({
					message: 'Your account has been banned. Please contact the support team'
				})
			}

			if(is_active != true) {

				return res.status(400).json({
					message: 'Please contact the support team for more information on your account. Thanks'
				})
			}



			//const companyId = req.params.companyId

			//const 
			//const 
			const username = generateFromEmail(req.body.name, 4)
			req.body.username =  await username
			const salt = await bcrypt.genSalt()
			req.body.apikey = await bcrypt.hash(req.body.name, salt)	
			req.body.qrcode = await bcrypt.hash(req.body.name, salt)		
	
			let property = await PropertyRepository.create(req.body)

			return {
				message: 'New Property added successfully!', property,
			}

		} catch(error) {
			console.log('Error registering property: ', error)
			next(new InternalServerError('Failed to register property'))
		}
	}



/*

	public viewuser = async(req: Request, res: Response): Promise<AuthDoc | null> => {

		try {

			const authid = req.params.authid
			let auth = await AuthRepository.findWithID(authid)

				return auth
	
		} catch(error) {
			console.log(error)
			throw new InternalServerError()
		}
	}




*/

	public async getCompanies(): Promise<PropertyDoc[]> {

		return PropertyRepository.getAll()
	}
}

export default new PropertyController()
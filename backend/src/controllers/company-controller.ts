import CompanyRepository from '../repositories/company-repository'
import { Company, CompanyDoc } from '../models/company-model'
//import UserRepository from '../repositories/user-repository'
//import { User, UserDoc } from '../models/user-model'
import { Request, Response, NextFunction } from 'express'
import { CompanyError } from '../helpers/errors/company-error'
import { ResourceNotFoundError } from '../helpers/errors/resource-not-found-error'
import { InternalServerError } from '../helpers/errors/internal-server-error'

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class CompanyController {

	public async register(req: Request, res: Response, next: NextFunction): Promise<void> {

		try{

			//include logged in user's ID as owner of company
			const { _id: ownerId, role, activated: isActivated, isbanned: isBanned, isactive: isActive } = req.auth || {}

			/*
			const ownerId = req.auth ? req.auth._id : null
			const role = req.auth ? req.auth.role : null
			const is_activated = req.auth ?  req.auth.activated : null
			const is_banned = req.auth ? req.auth.isbanned : null
			const is_active = req.auth ? req.auth.isactive : null

			let message
*/
			if(!ownerId) {

				res.status(400).json({ message: 'User ID not found in token' })	
				return
			} 

			if(role != 'Admin') {
				res.status(403).json({ message: 'Sorry, you are not authorized to perform this action' })
				return
				
			}

			if(!isActivated) {

				res.status(400).json({message: 'Please activate your account'})
				return
				
			}

			if(isBanned) {

				res.status(400).json({ message: 'Your account has been banned. Please contact support' })
				return
				
			}

			if(!isActive) {

				res.status(400).json({message: 'Please contact support for account activation '})
				return

			}

			req.body.owner_id = ownerId


			const salt = await bcrypt.genSalt()
			req.body.apikey = await bcrypt.hash(req.body.name, salt)
			req.body.username = await bcrypt.hash(req.body.name, salt)
	
			let company = await CompanyRepository.create(req.body)

				res.status(201).json({
					message: 'Company added successfully!', company
				})

/*

			return {
				message: 'Company added successfully!', company,
			}
*/

		} catch(error) {
			console.log('Error registering company: ', error)
			next(new InternalServerError('Failed to register company'))
		}
	}





	public viewcompany = async(req: Request, res: Response): Promise<CompanyDoc | null> => {

		try {

			//const ownerId = req.auth ? req.auth._id: null
			const companyId = req.params.companyId

			let company = await CompanyRepository.findWithID(companyId)

				return company
	
		} catch(error) {
			console.log(error)
			throw new InternalServerError()
		}
	}



		public viewcompanies = async(req: Request, res: Response, next: NextFunction): Promise<CompanyDoc[] | null> => {

		try {

			//const ownerId = req.auth ? req.auth._id: null
			const owner_id = req.auth ? req.auth._id : null
			if(!owner_id) {

				res.status(400).json({ message: 'User ID not found in token' })
			}

			let company = await CompanyRepository.getAll({owner_id: owner_id})

				return company
	
		} catch(error) {
			console.log(error)
			throw new InternalServerError()
		}
	}





/*
	public async getCompanies(): Promise<CompanyDoc[]> {

		return CompanyRepository.getAll()
	}
*/
}


export default new CompanyController()
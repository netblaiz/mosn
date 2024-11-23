import { Request, Response, NextFunction } from 'express'
import UserRoleRepository from '../repositories/user-role-repository'


export const checkRole = (requiredRole: string) => {

	return async(req: Request, res: Response, next: NextFunction) => {

		const auth_id = req.auth ? req.auth._id : null
		const { company_id, hotel_id } = req.params

		try {

			let userRole 
			
			if (hotel_id) {
				//check hotel role if hotel_id is provided

				userRole = await UserRoleRepository.find({ auth_id, hotel_id })
			} else {

				userRole = await UserRoleRepository.find({ auth_id, company_id })
			}

			if (userRole && userRole.role === requiredRole) {
				return next()
			} else{
				return res.status(403).json({
					message: "Insufficient permissions"
				})
			}
		} catch (error) {
			next(error)
		}
	}
}
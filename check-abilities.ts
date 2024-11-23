import { Request, Response, NextFunction } from 'express'
import { defineAbilitiesFor } from '../config/abilities'

export const checkAbility = (action: 'manage' | 'create' | 'read' | 'update' | 'delete', subject: string) => {

	return (req: Request, res: Response, next: NextFunction) => {

		const { role } = req.auth as { role: string }
		const ability = defineAbilitiesFor(role)

		if(ability.can(action, subject)) {
			return next()
		} else {
			return res.status(403).json({
				message: 'Access Denied'})
		}
	}
}
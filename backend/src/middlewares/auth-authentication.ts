import passport from 'passport'
import { Request, Response, NextFunction } from 'express'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate('jwt', {
		session: false }, (err: string, auth: any, info: string) => {
			if(err || !auth) {
				return res.status(401).json({
					message: 'Unauthorized' })
				}
				
			req.auth = auth
			next()
		})(req, res, next)
}
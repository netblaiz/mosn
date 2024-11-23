import { NextFunction, Request, Response } from 'express'
import { BaseError } from '../helpers/errors/base-error'

export const errorHandler = (

		error: Error,
		req: Request,
		res: Response,
		next: NextFunction) => {

	if (error instanceof BaseError) {

		return res.status(error.statusCode).send({errors: error.serializeErrors()})
	} else {

		console.log('Unknown Error')
		return res.status(500).send({errors: [{message: 'Something went wrong!'}]})
	}
}
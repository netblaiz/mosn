import { ValidationError } from 'express-validator'
import { BaseError } from './base-error'

export class RequestValidationError extends BaseError {
	statusCode = 400
	constructor(public errors: ValidationError[]){
		super("Validation Error")

		Object.setPrototypeOf(this, RequestValidationError.prototype)
	}

	serializeErrors = () => {

		let formattedErrors = this.errors.map(
				error=> {
					return {
						//message: error.msg, field: error.param}
						message: error.msg}
				})

		return formattedErrors
	}
}
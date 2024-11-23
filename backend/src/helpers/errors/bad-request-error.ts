import { BaseError } from './base-error'

export class BadRequestError extends BaseError{

	statusCode = 400

	constructor(private reason: string){

		super(reason)

		Object.setPrototypeOf(this, BadRequestError.prototype)
	}

	serializeErrors = () => {
		return [
		{
			message: this.reason
			
		}
		]
	}
}
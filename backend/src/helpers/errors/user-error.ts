import { BaseError } from './base-error'

export class UserError extends BaseError {

	statusCode = 400
	constructor(public error: string) {

		super("User Error")

		Object.setPrototypeOf(this, UserError.prototype)
	}

	serializeErrors = () => {
		let formattedErrors = [{message: this.error}]
		return formattedErrors
	}
}
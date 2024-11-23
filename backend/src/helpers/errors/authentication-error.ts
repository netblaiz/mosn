import { BaseError } from './base-error'

export class AuthenticationError extends BaseError {

	statusCode = 400
	constructor(public error: string) {

		super("Authentication Error")

		Object.setPrototypeOf(this, AuthenticationError.prototype)
	}

	serializeErrors = () => {
		let formattedErrors = [{message: this.error}]
		return formattedErrors
	}
}
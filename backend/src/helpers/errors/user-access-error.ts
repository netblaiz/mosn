import { BaseError } from './base-error'

export class UserAccessError extends BaseError {

	statusCode = 400
	constructor(public error: string) {

		super("User Access Error")

		Object.setPrototypeOf(this, UserAccessError.prototype)
	}

	serializeErrors = () => {
		let formattedErrors = [{message: this.error}]
		return formattedErrors
	}
}
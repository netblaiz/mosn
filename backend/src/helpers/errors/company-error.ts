import { BaseError } from './base-error'

export class CompanyError extends BaseError {

	statusCode = 400
	constructor(public error: string) {

		super("Company Error")

		Object.setPrototypeOf(this, CompanyError.prototype)
	}

	serializeErrors = () => {
		let formattedErrors = [{message: this.error}]
		return formattedErrors
	}
}
import { BaseError } from './base-error'

export class InternalServerError extends BaseError {

	statusCode = 500
	private error: string
	constructor(error?: string) {
		super("Internal Server Error")
		this.error = error ? error : "Interna; Server Error"

		Object.setPrototypeOf(this, InternalServerError.prototype)
	}

	serializeErrors = () => {
		let formattedErrors = [{message: this.error}]
		return formattedErrors
	}
}
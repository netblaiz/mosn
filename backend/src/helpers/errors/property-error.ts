import { BaseError } from './base-error'

export class PropertyError extends BaseError {

	statusCode = 400
	constructor(public error: string) {

		super("Property Error")

		Object.setPrototypeOf(this, PropertyError.prototype)
	}

	serializeErrors = () => {
		let formattedErrors = [{message: this.error}]
		return formattedErrors
	}
}
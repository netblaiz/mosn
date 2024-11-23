import { BaseError } from './base-error'

export class ResourceNotFoundError extends BaseError {

	statusCode = 404
	constructor(public error: string) {

		super(error)
		Object.setPrototypeOf(this, ResourceNotFoundError.prototype)
	}

	serializeErrors = () => {

		let formattedErrors = [{message: this.error}]

		return formattedErrors
	}
}
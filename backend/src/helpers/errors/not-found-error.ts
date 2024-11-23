import { BaseError } from './base-error'

export class NotFoundError extends BaseError {

	reason = 'Route Not found'
	statusCode = 404
	constructor() {

		super('Route Not Found')

		Object.setPrototypeOf(this, NotFoundError.prototype)
	}

	serializeErrors = () => {

		return [

				{message: this.reason}
			]
	}
}
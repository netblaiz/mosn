import { BaseError } from './base-error'

export class DatabaseConnectionError extends BaseError {

	reason = 'Database Not Connected'
	statusCode = 500
	constructor(public error: string) {

		super('error connecting to database!')

		Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
	}
	serializeErrors = () => {

		return [

				{message: this.reason}
			]
	}
}
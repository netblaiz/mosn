import { RequestValidationError } from '../helpers/errors/request-validation-error'
import { validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import { body, param } from 'express-validator'

class PropertyValidation {

	regex = new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/)

	create = [

			body('name')
			.notEmpty()
			.withMessage("Please enter the name of the facilty")
			.isString(),

			body('number_of_rooms')
			.notEmpty()
			.withMessage("Please enter the number of rooms")
		]
}

export default new PropertyValidation()
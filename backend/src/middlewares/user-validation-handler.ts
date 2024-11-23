import { RequestValidationError } from '../helpers/errors/request-validation-error'
import { validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import { body, param } from 'express-validator'

class UserValidation {

	regex = new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/)

	create = [

			body('firstname')
			.notEmpty()
			.withMessage("Please enter your firstname - This field cannot be empty!")
			.isString(),

			body('lastname')
			.notEmpty()
			.withMessage("Please enter your lastname/surname - This field cannot be empty!")
		]
}

export default new UserValidation()
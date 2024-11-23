import { RequestValidationError } from '../helpers/errors/request-validation-error'
import { validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import { body, param } from 'express-validator'

class AuthValidation {

	regex = new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/)

	create = [

			body('username')
			.notEmpty()
			.withMessage("username is required")
			.isString(),

			body('email')
			.notEmpty()
			.withMessage("email cannot be empty!")
			.isEmail()
			.withMessage("this is not an email format"),

			body('password')
			.notEmpty()
			.withMessage("password cannot be empty!")
			.isLength({ min: 8 })
			.withMessage("password cannot be less than 8 characters"),
		]
}

export default new AuthValidation()
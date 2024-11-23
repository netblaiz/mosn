import { RequestValidationError } from '../helpers/errors/request-validation-error'
import { validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import { body, param } from 'express-validator'

class CompanyValidation {

	regex = new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/)

	create = [

			body('name')
			.notEmpty()
			.withMessage("Please enter Company Name")
			.isString(),

			body('email')
			.notEmpty()
			.withMessage("Please enter company's email!")
		]
}

export default new CompanyValidation()
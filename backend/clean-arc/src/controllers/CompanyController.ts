import { NextFunction, Request, Response } from 'express'
import { iCompanyInteractor } from '../interfaces/iCompanyInteractor'
import { inject, injectable } from 'inversify'
import { INTERFACE_TYPE } from '../utils'

@injectable()
export class CompanyController {
	private interactor: iCompanyInteractor

	constructor(
		@inject(INTERFACE_TYPE.CompanyInteractor)
		interactor: iCompanyInteractor
		) {

		this.interactor = interactor
	}

	async onCreateCompany(req: Request, res: Response, next: NextFunction) {
		try { 
		const body = req.body

		const data = await this.interactor.createProduct(body)
		return res.status(200).json(data)
	} catch(error) {

		next(error)
	}
}

async onGetCompanies(req: Request, res: Response, next: NextFunction) {

	try{

		const offset = parseInt(`${req.query.offset}`) || 0
		const limit = parseInt(`${req.query.limit}`) || 10
		const data = await this.interactor.getCompanies(limit, offset)

		return res.status(200).json(data)
	} catch(error) {
		next(error)
	}
}

}
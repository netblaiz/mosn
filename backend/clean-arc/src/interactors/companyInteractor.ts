import { inject, injectable } from 'inversify'
import { IMailer } from '../interfaces/IMailer'
import { IMessageBroker } from '..interfaces/IMessageBroker'
import { ICompanyInteractor } from '../interfaces/ICompanyInteractor'
import { ICompanyRepository } from '../interfaces/ICompanyRepository'  
import { INTERFACE_TYPE } from '../utils'

 
@injectable()
export class CompanyInteractor implements ICompanyInteractor {

	private repository: ICompanyRepository
	private mailer: IMailer
	private broker: IMessageBroker

	constructor(
		@inject(INTERFACE_TYPE.CompanyRepository)
		 repository: ICompanyRepository
		@inject(INTERFACE_TYPE.Mailer) mailer: IMailer
		@inject(INTERFACE_TYPE.IMessageBroker) broker: IMessageBroker
		) {

		this.repository = repository
		(this.mailer = mailer), (this.broker = broker)
	}

	async createCompany(input: any) {
		const data = await this.repository.create(input)

		await this.broker.NotifyToPromotionService(data)

		return data
	}

	async getCompanies(limit: number, offset: number) {

		return this.repository.find(limit, offset)
	}
}
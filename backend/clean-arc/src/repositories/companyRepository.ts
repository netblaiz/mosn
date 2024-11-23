import { Pool } from 'pg'
import { Company } from '../entities/Company'
import { ICompanyRepository } from '../interfaces/ICompanyRepository'
import { pgClient } from '../dbConnection'
import { injectable } from 'inversify'

@injectable()
export class CompanyRepository implements ICompanyRepository {
	private client: Pool

	constructor() {
		this.client = pgClient()
	}

async create({ company_name, company_address, city, company_email, phone_country_code, phone_country_code2, company_phone, company_phone2, website, timezone, postal_code, selling_date, apikey }: Company): Promise<Company> {
	const company = await this.client.query(`INSERT INTO company(company_name, company_address, city_id, company_email, ext1, ext2, phone1, phone2, website, timeZone, postalCode, sellingDate, apikey) VALUES () RETURNING *`, 
		[company_name, company_address, city_id, company_email, phone_country_code, phone_country_code2, company_phone, company_phone2, website, timezone, postal_code, selling_date, apikey])
	return company.rows[0]
}


async update(field: string, id: number, value: any): Promise<Company> {

	const company = await this.client.query(
			`UPDATE company SET $1=$2 WHERE id=$3 RETURNING *`,
			[field, value, id]
		)
	return company.rows[0]
}


async find(limit: number, offset: number): Promise<Company[]> {
	const company = await this.client.query(`SELECT * FROM company OFFSET $1 LIMIT $2`, [offset, limit])
	return company.rows
}

	
}
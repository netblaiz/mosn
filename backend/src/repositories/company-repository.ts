import { Company, CompanyDoc } from '../models/company-model'

import CompanyType from '../models/types/company-type'


interface Query {

	name?: string,
	email?: string,
	apikey?: string,
	owner_id?: string
}

class CompanyRepository {

	create = async (CompanyData: CompanyType): Promise<CompanyDoc> => {

		return new Company(CompanyData).save()
	}

	getAll = async(query: {}): Promise<CompanyDoc[] | null> => {

		return Company.find(query)
	}

	findWithID = async (companyid: string): Promise<CompanyDoc | null> => {

		return Company.findById(companyid)
	}
}

export default new CompanyRepository()
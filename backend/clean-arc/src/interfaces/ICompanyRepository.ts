import { Company } from '../entities/Company'

export interface ICompanyRepository {

	create(data: Company): Promise<Company>
	update(field: string, id: number, value: any): Promise<Company>
	find(limit: number, offset: number): Promise<Company[]>                                 
}

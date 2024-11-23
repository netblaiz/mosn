import { Facility } from '../entities/Facility'

export interface IFacilityRepository {

	create(data: Facility): Promise<Facility>
	update(field: string, id: number, value: any): Promise<Facility>
	find(limit: number, offset: number): Promise<Company[]>
}
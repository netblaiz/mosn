export interface IFacilityInteractor {

	addFacility(input: any)
	activateFacility(field: number, id: number, value: number)
	getCompanyFacilities(limit: number, offset: number)
	searchFacilty(limit: number, offset: number)
	
}
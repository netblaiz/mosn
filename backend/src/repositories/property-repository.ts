import { Property, PropertyDoc } from '../models/property-model'

import PropertyType from '../models/types/property-type'


interface Query {

	name?: string,
	username?: string,
	company_id?: string,
	email?: string
}

class PropertyRepository {

	create = async (PropertyData: PropertyType): Promise<PropertyDoc> => {

		return new Property(PropertyData).save()
	}

	getAll = async(): Promise<PropertyDoc []> => {

		return Property.find({})
	}

	findWithID = async (propertyid: string): Promise<PropertyDoc | null> => {

		return Property.findById(propertyid)
	}


}

export default new PropertyRepository()
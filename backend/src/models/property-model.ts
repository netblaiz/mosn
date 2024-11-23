import mongoose, { Schema } from 'mongoose'
import PropertyType from './types/property-type'
//import { User, UserDoc } from './user-model'

interface PropertyModel extends mongoose.Model <PropertyDoc> {

	Create(propertyData:PropertyType): PropertyDoc
}


interface PropertyDoc extends mongoose.Document {
	name: string
	city: string
	state: string
	country: string

}

const propertySchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
		maxLength: 200
	},
		username: {

		type: String,
		unique: true,
		required: true,
		maxLength: 100
	},
		logo: {

		type: String,
		required: false
	},
		city: {

		type: String,
		required: true,
		maxLength: 100
	},
		state: {

		type: String,
		required: true,
		maxLength: 100

	},
		country: {

		type: String,
		required: true,
		maxLength: 5
	},
		property_type: {

		type: String,
		required: true,
		enum: ['Hotel', 'Resort', 'Apartment', 'AirBNB']

	},
		longitude: {

		type: String,
		required: false,
		maxLength: 100,
		default: null
	},
		latitude: {

		type: String,
		required: false,
		maxLength: 100,
		default: null

	},
		email: {

		type: String,
		required: false,
		maxLength: 100,
		default: null

	},
		taxid: {

		type: String,
		required: false
	},
		taxverified: {

		type: Boolean,
		default: false
	},
		website: {

		type: String,
		required: false,
		default: null
	},
		company_id: {
			
		type: Schema.Types.ObjectId,
		ref: 'Company',
		required: true,
	},
		number_of_rooms: {

		type: Number,
		required: true

	},
		sellingdate: {
			
		type: Date,
		default: Date.now
	},
		apikey: {

		type: String,
		required: true,
		unique: true
	},
		qrcode: {

		type: String,
		required: true,
		unique: true
	}

}, { timestamps: true })


propertySchema.statics.Create = (propertyData: PropertyType) => {

	return new Property(propertyData)
}

const Property = mongoose.model<PropertyDoc, PropertyModel>('Property', propertySchema)

export { Property, PropertyDoc }
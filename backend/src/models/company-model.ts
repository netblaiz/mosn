import mongoose, { Schema } from 'mongoose'
import CompanyType from './types/company-type'
import { User, UserDoc } from './user-model'

interface CompanyModel extends mongoose.Model <CompanyDoc> {

	Create(companyData:CompanyType): CompanyDoc
}


interface CompanyDoc extends mongoose.Document {
	name: string
	email: string
	apikey: string
	owner_id: string

}

const companySchema = new mongoose.Schema({
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
		email: {

		type: String,
		required: false,
		unique: true,
		default: null
	},
		headquarters: {

		type: String,
		required: false,
		default: null,
		maxLength: 500

	},
		phone_ext: {

		type:Number,
		required: false,
		default: null,
		maxLength: 5
	},
		phone_number: {

		type: Number,
		required: false,
		default: null,
		maxLength: 15
	},
		website: {

		type: String,
		required: false,
		maxLength: 200,
		unique: true,
		default: null
	},
		timezone: {

		type: String,
		required: true
	},
		postalcode: {

		type: String,
		required: false,
		maxLength: 10
	},
		taxid: {

		type: String,
		unique: true,
		required: true
	},
		taxverified: {

		type: Boolean,
		default: false
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
		owner_id: {
			
		type: Schema.Types.ObjectId,
		ref: 'Auth',
		required: true,
	}

}, { timestamps: true })


companySchema.statics.Create = (companyData: CompanyType) => {

	return new Company(companyData)
}

const Company = mongoose.model<CompanyDoc, CompanyModel>('Company', companySchema)

export { Company, CompanyDoc }
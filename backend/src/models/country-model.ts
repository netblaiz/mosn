import mongoose, { Schema } from 'mongoose'

const countrySchema = new mongoose.Schema({
	name: {
		
		type: String,
		required: true,
		unique: true
	},

	short: {

		type: String,
		required: true,
		unique: true,
		maxLength: 3
	}

})

const Country = mongoose.model('Country', countrySchema)

export { Country }

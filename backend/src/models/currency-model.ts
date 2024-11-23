import mongoose, { Schema } from 'mongoose'

const currencySchema = new mongoose.Schema({
	name: {
		
		type: String,
		required: true,
		unique: true
	},

	code: {

		type: String,
		required: true,
		unique: true,
		maxLength: 3
	},

	symbol: {

		type: String,
		required: true
	},

	country: {

		type: String,
		required: true
	}

})

const Currency = mongoose.model('Currency', currencySchema)

export { Currency }
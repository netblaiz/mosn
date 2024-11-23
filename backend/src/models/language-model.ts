import mongoose, { Schema } from 'mongoose'

const languageSchema = new mongoose.Schema({
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

const Language = mongoose.model('Language', languageSchema)

export { Language }

import mongoose, { Schema } from 'mongoose'

const roleSchema = new mongoose.Schema({
	role: {
		
		type: String,
		required: true,
		unique: true
	},

	permission: {

		type: [String],
		required: true,
		unique: true,
		maxLength: 3
	}

})

const Role = mongoose.model('Role', roleSchema)

export { Role }

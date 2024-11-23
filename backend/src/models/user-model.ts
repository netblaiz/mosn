import mongoose, { Schema } from 'mongoose'
import UserType from './types/user-type'
import { Auth } from './auth-model'
import { Country } from './country-model'
import { Currency } from './currency-model'
import { Language } from './language-model'
import { Role } from './role-model'

interface UserModel extends mongoose.Model <UserDoc> {

	Create(userData:UserType): UserDoc
}


interface UserDoc extends mongoose.Document {
	title: string
	firstname: string
	lastname: string
	middlename: string

}

const userSchema = new mongoose.Schema({
	firstname: {

		type: String,
		required: true,
		maxLength: 200
	},
		lastname: {

		type: String,
		required: true,
		maxLength: 200
	},
		middlename: {

		type: String,
		required: false,
		maxLength: 200
	},
		avatar: {

		type: String,
		required: false,
		default: null,
		maxLength: 200

	},
		signature: {

		type: String,
		required: false,
		default: null,
		maxLength: 200
	},
		authid: {

		type: Schema.Types.ObjectId,
		ref: 'Authentication',
		required: true
	},
		email: {

		type: String,
		required: false,
		maxLength: 300,
		default: null
	},
		phone_ext: {

		type: Number,
		required: true,
		minLength: 1,
		maxLength: 4
	},
		phone_number: {

		type: Number,
		required: true,
		maxLength: 15,
		unique: true
	},
		phone_verified: {

		type: Boolean,
		required: true,
		default: false
	},

		allowphonedisplay: {

		type: Boolean,
		default: true
	},
		default_language: {
			
		//type: Schema.Types.ObjectId,
		//ref: 'Language',
		type: String,
		required: true,
		default: 'English'
	},
		default_currency: {

		type: String,
		//type: Schema.Types.ObjectId,
		//ref: 'Currency',
		required: true,
		default: 'USD'
	},
		role: {
		type: String,	
		//type: Schema.Types.ObjectId,
		//ref: 'Role',
		required: true

	},

})


userSchema.statics.Create = (userData: UserType) => {

	return new User(userData)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User, UserDoc }
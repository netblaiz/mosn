import mongoose, { Schema } from 'mongoose'
import AuthType from './types/auth-type'

interface AuthModel extends mongoose.Model <AuthDoc> {

	Create(authData:AuthType): AuthDoc
}


interface AuthDoc extends mongoose.Document {
	username: string
	email: string
	password: string
	role: string
	ispartner: string
	userhash: string
	activated: string
	isbanned: string
	banreason: string
	newpasswordkey: string
	newpasswordkeyrequested: string
	activationemailkey: string
	emailkeyrequested: string
	qrcode: string
	lastip: string
	useragent: string
	lastlogin: string
	created_at: string
	modified_at: string
	accept_terms: string
	accept_terms_date: string
	isactive: string
}

const authSchema = new mongoose.Schema({
	username: {

		type: String,
		required: true,
		maxLength: 100,
		unique: true

	},
	email: {

		type: String,
		required: true,
		maxLength: 200,
		unique: true

	},
		password: {

		type: String,
		required: true,
		maxLength: 200

	},
		role: {

		type: String,
		required: true,
		default: 'Basic',
		maxLength: 30

	},
		ispartner: {

		type: Boolean,
		required: true,
		default: true
		
	},
		userhash: {

		type: String,
		required: true,
		maxLength: 200

	},
		activated: {

		type: Boolean,
		required: true,
		default: false
	},
		isbanned: {

		type: Boolean,
		required: true,
		default: false

	},
		banreason: {

		type: String,
		required: false,
		maxLength: 500

	},
		newpasswordkey: {

		type: String,
		required: false,
		maxLength: 50,
		default: null

	},
		newpasswordkeyrequested: {

		type: Boolean,
		required: true,
		default: false

	},
		activationemailkey: {

		type: String,
		required: true,
		maxLength: 100

	},
		emailkeyrequested: {

		type: Boolean,
		required: true,
		default: true
	},	
		qrcode: {

		type: String,
		required: true,
		maxLength: 100,
		unique: true
	},
		lastip: {
			
		type: String,
		required: true,
		maxLength: 100
	},
		lastlogin: {
			
		type: String,
		required: true,
		maxLength: 100
	},
		accept_terms: {

		type: Boolean,
		required: true,
		default: false
	},
		accept_terms_date: {
		type: Date
	},
		isactive: {

		type: Boolean,
		default: true
	},

}, { timestamps: true })

authSchema.statics.Create = (authData: AuthType) => {

	return new Auth(authData)
}

const Auth = mongoose.model<AuthDoc, AuthModel>('Auth', authSchema)

export { Auth, AuthDoc }
import mongoose, { Schema } from 'mongoose'
import UserRoleType from './types/user-role-type'

interface UserRoleModel extends mongoose.Model <UserRoleDoc> {

	Create(userRoleData:UserRoleType): UserRoleDoc
}


interface UserRoleDoc extends mongoose.Document {

	auth_id: string
	company_id: string
	hotel_id: string
	role: string

}

const userRoleSchema = new mongoose.Schema({

	auth_id: {

		type: Schema.Types.ObjectId,
		ref: 'Authentication',
		required: true
	},
		company_id: {

		type: Schema.Types.ObjectId,
		ref: 'Company'
	},
		property_id: {

		type: Schema.Types.ObjectId,
		ref: 'Property'
	}
})


userRoleSchema.statics.Create = (userRoleData: UserRoleType) => {

	return new UserRole(userRoleData)
}

const UserRole = mongoose.model<UserRoleDoc, UserRoleModel>('UserRole', userRoleSchema)

export { UserRole, UserRoleDoc }
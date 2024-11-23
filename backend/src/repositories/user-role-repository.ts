import { UserRole, UserRoleDoc } from '../models/user-role-model'

import UserRoleType from '../models/types/user-role-type'

interface Query {

	auth_id?: string,
	company_id?: string ,
	hotel_id: string
}


class UserRoleRepository {

	create = async (UserRoleData: UserRoleType): Promise<UserRoleDoc> => {

		return new UserRole(UserRoleData).save()
	}

	getAll = async(): Promise<UserRoleDoc []> => {

		return UserRole.find({})
	}

	findWithID = async (userid: string): Promise<UserRoleDoc | null> => {

		return UserRole.findById(userid)
	}

	find = async (query: {}): Promise<UserRoleDoc | null> => {

		return UserRole.findOne(query)

	}

/*
	find = async(query: {}): Promise<UserDoc[] | null> => {

		return User.find(query)
	}

	login = async(query: {}): Promise<UserDoc | null> => {

		return User.find(query)
	}



	activateaccount = async (id: string, activated: boolean): Promise<AuthDoc | null> => {

		_id = mongoose.Types.ObjectId(Authentication)

		return Auth.findOneAndUpdate({_id: _id}, {$set: {activated: true}}, {new: true})
	}
*/
}

export default new UserRoleRepository()
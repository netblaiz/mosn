import { User, UserDoc } from '../models/user-model'

import UserType from '../models/types/user-type'

interface Query {

	username?: string,
	email?: string ,
	password: string
}


class UserRepository {

	create = async (UserData: UserType): Promise<UserDoc> => {

		return new User(UserData).save()
	}

	getAll = async(): Promise<UserDoc []> => {

		return User.find({})
	}

	findWithID = async (userid: string): Promise<UserDoc | null> => {

		return User.findById(userid)
	}

	find = async (query: {}): Promise<UserDoc | null> => {

		return User.findOne(query)

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

export default new UserRepository()
import { Auth, AuthDoc } from '../models/auth-model'
import AuthType from '../models/types/auth-type'


interface Query {

	username?: string,
	email?: string ,
	password: string
}

class AuthRepository {

	create = async (AuthData: AuthType): Promise<AuthDoc> => {

		return new Auth(AuthData).save()
	}

	getAll = async(): Promise<AuthDoc []> => {

		return Auth.find({})
	}

	findWithID = async (authid: string): Promise<AuthDoc | null> => {

		return Auth.findById(authid)
		//.populate('user', 'firstname lastname middlename avatar signature email phone_ext phone_number')
	}

	findByUserId = async (authid: string): Promise<AuthDoc | null> => {

		return Auth.findOne({ _id: authid })
		//.populate('user', 'firstname lastname middlename avatar signature email phone_ext phone_number')
	}

	findOne = async (credential: {} ): Promise<AuthDoc | null> => {

		return Auth.findOne(credential)

	}


	update = async (query: {}, set: {}) => {

		return Auth.findOneAndUpdate(query, {$set: set}, {new: true})
	}
/*

	find = async(query: {}): Promise<AuthDoc[] | null> => {

		try {

			const authEntry = await Auth.findOne({ username })

			if(!authEntry) {

				return res.status(401).json( {message: 'Invalid Credentials!'} )
			}

			const isMatch = await bcrypt.compare(password, authEntry.password)

			if(!isMatch) {
				return res.status(401).json( {message: 'Invalid Credentials!'} )
			}

		} catch(err) {

			res.status(500).json({ error: err.message })
		}

		return Auth.find(query)
	}


	activateaccount = async (id: string, activated: boolean): Promise<AuthDoc | null> => {

		_id = mongoose.Types.ObjectId(Authentication)

		return Auth.findOneAndUpdate({_id: _id}, {$set: {activated: true}}, {new: true})
	}
*/
}

export default new AuthRepository()
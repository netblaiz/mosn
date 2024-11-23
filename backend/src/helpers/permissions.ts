import redisClient from '../config/redis'
import { UserAccess } from  '../models/user-access-model'

const PERMISSION_EXPIRATION = Number(process.env.PERMISSION_EXPIRATION) || 3600

export const checkUserPermission = async (

		auth_id: string,
		resource_type: 'Company' | 'Hotel' | 'Feature',
		resource_id: string
	): Promise<boolean> => {

	const cacheKey = `permissions:${auth_id}:${resource_type}:${resource_id}`

	const cachePermission = await redisClient.get(cacheKey)
	if(cachePermission !== null) {
		return JSON.parse(cachePermission)
	}

	const access = await UserAccess.findOne({
		auth_id,
		resource_type,
		resource_id
	})

	const hasPermission = !!access

	await redisClient.set(cacheKey, JSON.stringify(hasPermission), {
		EX: PERMISSION_EXPIRATION,
	})

	return hasPermission
}
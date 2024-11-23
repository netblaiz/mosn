import { createClient } from 'redis'

const redisClient = createClient({
	url: process.env.REDIS_URL,
})

export const connectRedis = async () => {
	await redisClient.connect()
	console.log('Connected to Redis')
}

export default redisClient

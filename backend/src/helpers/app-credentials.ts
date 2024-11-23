import dotenv from 'dotenv'
dotenv.config()

class AppCredentials {
	port: number = parseInt(process.env.PORT!) || 4000
	dbHost = process.env.DB_HOST || 'localhost'
	dbPort = process.env.DB_PORT || '27017'
	dbName = process.env.DB_NAME || 'mosn_onboarding'
	authDbName = process.env.AUTH_DB_NAME || 'admin'
	dbUser = process.env.DB_USER || 'mosn'
	dbPassword = process.env.DB_PASSWORD || ''
	periodicCheckInterval: string = process.env.PERIODIC_CHECK_INTERVAL || '*/0.5 * * * *'
	dbUrl = process.env.MONGODB_URI 
}

export default new AppCredentials()
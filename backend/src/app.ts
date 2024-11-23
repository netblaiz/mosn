//import './@types/express';
import express, { Application, Request, Response } from 'express'
import passport from './config/passport'
import session from 'express-session'
import  redisClient, { connectRedis }  from './config/redis'
import RedisStore  from 'connect-redis'
import { checkAbility } from './middlewares/abilities-middleware'
import AuthRoutes from './routes/auth-routes'
import CompanyRoutes from './routes/company-routes'
import PropertyRoutes from './routes/property-routes'
import mongoose from 'mongoose'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './helpers/errors/not-found-error'
import { DatabaseConnectionError } from './helpers/errors/database-connection-error'
import swaggerUi = require('swagger-ui-express')
import fs from 'fs'

class OnBoardingService {

	private swaggerFile: any = (process.cwd()+'/swagger.json')
	private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8')
	private swaggerDocument = JSON.parse(this.swaggerData)
	private app: Application

	constructor() {

		this.app = express()
		this.app.use(express.json())
		//this.initializeRedis()
		//this.initializeSession()
		this.initializePassport()
		this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument))
		this.initializeRoutes()
	}

	start = (port: Number) => {

		return this.app.listen(port, () => {
			console.log(`OnBoarding is running on port >>> ${port}`)
		})

	}

/*
	private initializeRedis = async () => {

		await connectRedis()
	}



	private initializeSession = () => {
		this.app.use(
			session({
				secret: process.env.SESSION_SECRET || 'your-session-secret',
				resave: false,
				saveUninitialized: false,
				cookie: { secure: false, httpOnly: true, maxAge: 60000 },
			})
		)
	}
*/

	private initializePassport = () => {
/*
		const redisStore = new RedisStore({ client: redisClient
		})
		this.app.use(
			session({
				store: redisStore,
				secret: process.env.SESSION_SECRET || 'your-session-secret',
				resave: false,
				saveUninitialized: false,
				cookie: { secure: false, httpOnly: true, maxAge: 60000 },
			})
			)
*/
		this.app.use(passport.initialize())
		//this.app.use(passport.session())

		
	}

	private initializeRoutes = () => {

		new AuthRoutes(this.app)
	    new CompanyRoutes(this.app)
	    new PropertyRoutes(this.app)

	    // in OnBoardingService.ts

		this.app.route('/')
		.get(async(req: Request, res: express.Response) => {
			return res.status(200).send(`Mosn Onboarding Service Running`)
		})

		this.app.use(errorHandler)
	}

	getAppInstance = () => {

		return this.app
	}

	runJobs = () => {

	}

	connectDb = async(dbUrl: any) => {

		try{
			await mongoose.connect(dbUrl)
			console.log(`Successfully connected to Database!`)
		} catch(error) {

			console.log(`Error connecting to Database`, error)
			throw new DatabaseConnectionError('Error connecting DB')
		}
	}

	}

export default new OnBoardingService()
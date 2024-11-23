import { BaseRoute } from '../helpers/base-route'
import { Request, Response, Application, NextFunction } from 'express'
import passport from '../config/passport'
import AuthController from '../controllers/auth-controller'
import { Auth, AuthDoc } from '../models/auth-model'
import AuthValidation from '../middlewares/auth-validation-handler'


export default class AuthRoutes extends BaseRoute {

	constructor(app: Application) {
		super(app)
	}

	setUpRoutes() {

		this.app.route("/user/register")
		.post(AuthValidation.create, (req: Request, res: Response, next: NextFunction) => {
			AuthController.register(req, res)
			.then(auth=>{
				return res.status(201).send(auth)
			}).catch(error =>{
				next(error)
			})
		})

		this.app.route("/user/login")
		.post((req: Request, res: Response, next: NextFunction) => {
			AuthController.login(req, res, next)})

		this.app.route("/user/activateaccount")
		.put(passport.authenticate('jwt', {
			session: false
		}), (req: Request, res: Response, next: NextFunction) => {
			AuthController.activateaccount(req, res, next)
			.then(auth=>{
				return res.status(201).send(auth)
			}).catch(error =>{
				next(error)
			})
		})

		this.app.route("/user/activatebyemail/:activationemailkey")
		.put(passport.authenticate('jwt', {
			session: false
		}), (req: Request, res: Response, next: NextFunction) => {
			AuthController.activateaccountbyemail(req, res, next)
			.then(auth=>{
				return res.status(201).send(auth)
			}).catch(error =>{
				next(error)
			})
		})


		this.app.route("/user/profile")
		.get(passport.authenticate('jwt', {
			session: false
		}), (req: Request, res: Response, next: NextFunction) => {
			AuthController.viewuser(req, res, next)
			.then(auth=>{
				return res.status(201).send(auth)
			}).catch(error =>{
				next(error)
			})
		})


		/*
		.put(AuthValidation.create, async(req: Request, res: Response, next: NextFunction) => {

			AuthController.create(req, res)
			.then(auth=>{
				return res.status(201).send(auth)
			}).catch(error =>{
				next(error)
			})
		}) */

		return this.app


}}

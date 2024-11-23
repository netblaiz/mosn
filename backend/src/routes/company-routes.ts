import { BaseRoute } from '../helpers/base-route'
import { Request, Response, Application, NextFunction } from 'express'
import passport from '../config/passport'
import { checkAbility } from '../middlewares/abilities-middleware'
import { checkPermission } from '../middlewares/check-permission'
import { Auth, AuthDoc } from '../models/auth-model'
import CompanyController from '../controllers/company-controller'
import CompanyValidation from '../middlewares/company-validation-handler'
import UserRoleController from '../controllers/user-role-controller'
import { checkRole } from '../middlewares/role-warden'


export default class CompanyRoutes extends BaseRoute {

	constructor(app: Application) {
		super(app)
	}

	setUpRoutes() {
/*


		this.app.route("/companies")
		.post(CompanyValidation.create, passport.authenticate('jwt', { session: false }), checkAbility('create', 'Company'), async (req: Request, res: Response, next: NextFunction) => {
			CompanyController.register(req, res)
			.then(auth=>{
				return res.status(201).send(auth)
			}).catch(error =>{
				next(error)
			})
		})
*/

		// 

		this.app.route("/companies")
		.post(passport.authenticate('jwt', { session: false }), CompanyValidation.create, async (req: Request, res: Response, next: NextFunction) => {

			CompanyController.register(req, res, next)
			.then(company=>{
				return res.status(201).send(company)
			}).catch(error => {
				next(error)
			})
		
		})
		.get(passport.authenticate('jwt', {
			session: false}), async (req: Request, res: Response, next: NextFunction) => {
			CompanyController.viewcompanies(req, res, next)
			.then(company=>{
				return res.status(201).send(company)
			}).catch(error => {
				next(error)	
			})
		})


		this.app.route("/companies/:company_id/users")
		.post(passport.authenticate('jwt', { session: false }), checkRole('Owner'),
			async (req: Request, res: Response, next: NextFunction) => {
			try{

				const company = await UserRoleController.addUserToCompany(req, res)
				return res.status(201).json(company)
			} catch (error) {

				next(error)
			}
		})


		this.app.route("/companies/:company_id/hotels/:hotel_id/users")
		.post(passport.authenticate('jwt', { session: false }), checkRole('Owner'),
			async (req: Request, res: Response, next: NextFunction) => {
			try{

				const company = await UserRoleController.addUserToHotel(req, res)
				return res.status(201).json(company)
			} catch (error) {

				next(error)
			}
		})



		return this.app


}}

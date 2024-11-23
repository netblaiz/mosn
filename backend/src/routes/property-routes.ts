import { BaseRoute } from '../helpers/base-route'
import { Request, Response, Application, NextFunction } from 'express'
import passport from '../config/passport'
import { checkAbility } from '../middlewares/abilities-middleware'
import { checkPermission } from '../middlewares/check-permission'
import { Property, PropertyDoc } from '../models/property-model'
import PropertyController from '../controllers/property-controller'
import PropertyValidation from '../middlewares/property-validation-handler'


export default class PropertyRoutes extends BaseRoute {

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

		this.app.route("/properties")
		.post(passport.authenticate('jwt', { session: false }), PropertyValidation.create, async (req: Request, res: Response, next: NextFunction) => {
			try{

				const property = await PropertyController.register(req, res, next)
				return res.status(201).json(property)
			} catch (error) {

				next(error)
			}
		})



		return this.app


}}

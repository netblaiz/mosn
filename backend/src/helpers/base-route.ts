import { Application } from 'express'
export abstract class BaseRoute {

	app: Application

	constructor(app: Application) {

		this.app = app
		this.setUpRoutes()
	}

	abstract setUpRoutes(): Application
}
import { injectable } from 'inversify'
import { IMailer } from '../interfaces/IMailer'

@injectable()
export class Mailer implements IMailer{

	SendMail(to: string, message: unknown) {
		console.log("sending mail")
		return true
	}
}
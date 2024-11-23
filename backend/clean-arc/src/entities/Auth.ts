export class Auth {
	constructor(

			public readonly id: number
			public  readonly username: string
			public  email: string
			private _password: string
			public  isPartner: number 
			private userhash: string
			public activated: number = 0
			public banned: number = 0
			public banreason: string
			public newpasswordkey: string
			public newpasswordkeyrequested?: string
			public activationemailkey: string
			public emailkeyrequested: string
			public readonly qrcode: string
			public lastip: string
			public lastlogin?: string
			public createdat: string
			public modifiedat: string
			public accepttos: number = 0
			public datetos: string		
			public isactive: boolean = true

		) {}

	public setPassword(newPassword: string): void {
		if (newPassword.length < 6) {

			throw new Error('Password must be at least 6 characters long')
		}

		this._password = newPassword
	}


	public checkPassword(password: string): boolean {

		return this._password === password
	}

	public deactivate(): void {

		this.isactive = false
	}

	public activate(): void {

		this.isactive = true
	}



}
export class User {
	constructor(

			public readonly id: number
			public  title: string
			public  firstname: string
			public  lastname: string
			public  middlename?: string
			public  avatar?: string
			public readonly signature?: string
			public readonly authid: number
			public readonly email: string
			public readonly ext: number
			public readonly ext2?: number
			public readonly phone1: number
			public readonly phone2: number
			public allowphonedisplay: number
			public readonly nationality: string
			public readonly state: string
			public readonly city: string
			public language: string
			public languageID: number
			public readonly currency: number
			public currentcompanyid: number
			public readonly currentrole: number

		) {}

	public getFullName(): string {
		return `${this.firstname} ${this.lastname} ${this.middlename}`
	}



}
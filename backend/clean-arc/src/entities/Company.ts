export class Company {

	constructor(

			public readonly id: number
			public readonly company_name: string
			public readonly company_address: string
			public readonly city: string
			public readonly logo?: string
			public readonly company_email: string
			public readonly phone_country_code: number
			public readonly phone_country_code2?: number
			public readonly company_phone: number
			public readonly company_phone2?: number
			public readonly website: string
			public readonly timezone: string
			public readonly postal_code: string
			public readonly selling_date?: string
			public readonly apikey?: string

		)

	{}
}
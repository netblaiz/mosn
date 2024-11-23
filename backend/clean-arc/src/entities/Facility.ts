export class Facility {

	constructor(

			public readonly id: number
			public readonly name: string
			public readonly address: string
			public readonly facility_type: number
			public readonly longitude: number
			public readonly latitude: number
			public readonly city: string
			public readonly state: string
			public readonly logo?: string
			public readonly propertyhash: string
			public readonly owner_id: number
			public readonly email: string
			public readonly company_id: number
			public readonly number_of_rooms: number
			public readonly ext: number
			public readonly ext2?: number
			public readonly phone: number
			public readonly phone2?: number
			public readonly website: string
			public readonly timezone: string
			public readonly postal_code: string
			public readonly selling_date: string
			public readonly apikey: string
			public readonly field?: string

		)
}
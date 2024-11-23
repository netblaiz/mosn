import { AbilityBuilder, Ability, AbilityClass } from '@casl/ability'

type Actions = 'manage' | 'read' | 'update'
type Subjects = 'Company' | 'all'

export type AppAbility = Ability<[Actions, Subjects]>

export function defineAbilitiesFor(auth: { role: string }): AppAbility { const { can, cannot, build} = new AbilityBuilder<AppAbility>(Ability as AbilityClass<AppAbility>)

if (auth.role === 'Admin') {

	can('manage', 'all')
} else if (auth.role === 'Manager') {
	can('read', 'Company')
	can('update', 'Company')
} else if (auth.role === 'Viewer') {

	can('read', 'Company')
} else {
	cannot('manage', 'all')
}
	return build()
}
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType  } from '@casl/ability'
import { Auth, AuthDoc } from '../models/auth-model'

type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'
type Subjects = 'Company' | 'Hotel' | 'Feature' | 'User' | 'Auth' | 'all'

export type AppAbility = Ability<[Actions, Subjects]>

export function defineAbilitiesFor(role: string): AppAbility {
	const { can, cannot, build } = new AbilityBuilder<AppAbility>(Ability as AbilityClass<AppAbility>)

switch (role) {

case 'admin':
	can('manage', 'all')
	break

case 'manager':
	can('read', 'Company')
	can('manage', 'Hotel')
	cannot('delete', 'Company')
	break

case 'user':
	can('read', 'Feature')
	cannot('manage', 'Company')
	break

default:
	can('read', 'Feature')
}

return build({
	detectSubjectType: (item) => (item as any).constructor as ExtractSubjectType<Subjects>,
})
}
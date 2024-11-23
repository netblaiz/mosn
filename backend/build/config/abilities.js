"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineAbilitiesFor = void 0;
const ability_1 = require("@casl/ability");
function defineAbilitiesFor(role) {
    const { can, cannot, build } = new ability_1.AbilityBuilder(ability_1.Ability);
    switch (role) {
        case 'admin':
            can('manage', 'all');
            break;
        case 'manager':
            can('read', 'Company');
            can('manage', 'Hotel');
            cannot('delete', 'Company');
            break;
        case 'user':
            can('read', 'Feature');
            cannot('manage', 'Company');
            break;
        default:
            can('read', 'Feature');
    }
    return build({
        detectSubjectType: (item) => item.constructor,
    });
}
exports.defineAbilitiesFor = defineAbilitiesFor;

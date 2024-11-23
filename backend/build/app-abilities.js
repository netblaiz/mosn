"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineAbilitiesFor = void 0;
const ability_1 = require("@casl/ability");
function defineAbilitiesFor(auth) {
    const { can, cannot, build } = new ability_1.AbilityBuilder(ability_1.Ability);
    if (auth.role === 'Admin') {
        can('manage', 'all');
    }
    else if (auth.role === 'Manager') {
        can('read', 'Company');
        can('update', 'Company');
    }
    else if (auth.role === 'Viewer') {
        can('read', 'Company');
    }
    else {
        cannot('manage', 'all');
    }
    return build();
}
exports.defineAbilitiesFor = defineAbilitiesFor;

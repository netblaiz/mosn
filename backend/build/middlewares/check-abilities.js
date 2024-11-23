"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAbility = void 0;
const abilities_1 = require("../config/abilities");
const checkAbility = (action, subject) => {
    return (req, res, next) => {
        const { role } = req.user;
        const ability = (0, abilities_1.defineAbilitiesFor)(role);
        if (ability.can(action, subject)) {
            return next();
        }
        else {
            return res.status(403).json({
                message: 'Access Denied'
            });
        }
    };
};
exports.checkAbility = checkAbility;

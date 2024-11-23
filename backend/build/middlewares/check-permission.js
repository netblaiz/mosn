"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = void 0;
const permissions_1 = require("../helpers/permissions");
const checkPermission = (resource_type) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { auth } = req;
    const resource_id = req.params[`${resource_type.toLowerCase()}Id`];
    if (!auth || !resource_id) {
        return res.status(400).json({ message: 'User or resource not specified.' });
    }
    try {
        const hasDirectAccess = yield (0, permissions_1.checkUserPermission)(auth._id, resource_type, resource_id);
        if (hasDirectAccess) {
            return next();
        }
        if (hasDirectAccess) {
            return next();
        }
        if (resource_type === 'Hotel') {
            const hotelAccess = yield (0, permissions_1.checkUserPermission)(auth._id, 'Company', resource_id);
            if (hotelAccess)
                return next();
        }
        else if (resource_type === 'Feature') {
            const featureAccess = yield (0, permissions_1.checkUserPermission)(auth._id, 'Hotel', resource_id);
            if (featureAccess)
                return next();
        }
        res.status(403).json({ message: 'Access denied to this resource' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.checkPermission = checkPermission;

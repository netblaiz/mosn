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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserPermission = void 0;
const redis_1 = __importDefault(require("../config/redis"));
const user_access_model_1 = require("../models/user-access-model");
const PERMISSION_EXPIRATION = Number(process.env.PERMISSION_EXPIRATION) || 3600;
const checkUserPermission = (auth_id, resource_type, resource_id) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `permissions:${auth_id}:${resource_type}:${resource_id}`;
    const cachePermission = yield redis_1.default.get(cacheKey);
    if (cachePermission !== null) {
        return JSON.parse(cachePermission);
    }
    const access = yield user_access_model_1.UserAccess.findOne({
        auth_id,
        resource_type,
        resource_id
    });
    const hasPermission = !!access;
    yield redis_1.default.set(cacheKey, JSON.stringify(hasPermission), {
        EX: PERMISSION_EXPIRATION,
    });
    return hasPermission;
});
exports.checkUserPermission = checkUserPermission;

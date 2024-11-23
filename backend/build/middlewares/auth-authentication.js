"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const passport_1 = __importDefault(require("passport"));
const authenticateToken = (req, res, next) => {
    passport_1.default.authenticate('jwt', {
        session: false
    }, (err, auth, info) => {
        if (err || !auth) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        req.auth = auth;
        next();
    })(req, res, next);
};
exports.authenticateToken = authenticateToken;

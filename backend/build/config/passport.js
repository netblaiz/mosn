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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_repository_1 = __importDefault(require("../repositories/auth-repository"));
const authentication_error_1 = require("../helpers/errors/authentication-error");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//import { Request } from 'express'
const JWT_SECRET = process.env.SECRET_KEY || 'default_secret_key';
passport_1.default.use(new passport_local_1.Strategy({ usernameField: 'identifier', passwordField: 'password' }, (identifier, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const auth = emailRegex.test(identifier)
            ? yield auth_repository_1.default.findOne({ email: identifier })
            : yield auth_repository_1.default.findOne({ username: identifier });
        if (!auth)
            return done(new authentication_error_1.AuthenticationError('User not found'), false);
        const isMatch = yield bcryptjs_1.default.compare(password, auth.password);
        if (!isMatch)
            return done(new authentication_error_1.AuthenticationError('Invalid credentials'), false);
        return done(null, auth);
    }
    catch (error) {
        return done(error);
    }
})));
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
    passReqToCallback: true,
};
passport_1.default.use(new passport_jwt_1.Strategy(opts, (req, jwt_payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //cross-ref jwt with user info in database				
        const auth = yield auth_repository_1.default.findWithID(jwt_payload.authId);
        //console.log(auth) for debugging purpose
        if (!auth) {
            return done(new authentication_error_1.AuthenticationError('User not found'), false);
        }
        req.auth = auth;
        return done(null, auth);
    }
    catch (error) {
        return done(error, false);
    }
})));
exports.default = passport_1.default;

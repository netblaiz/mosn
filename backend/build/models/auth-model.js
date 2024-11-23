"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const authSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        maxLength: 100,
        unique: true
    },
    email: {
        type: String,
        required: true,
        maxLength: 200,
        unique: true
    },
    password: {
        type: String,
        required: true,
        maxLength: 200
    },
    role: {
        type: String,
        required: true,
        default: 'Basic',
        maxLength: 30
    },
    ispartner: {
        type: Boolean,
        required: true,
        default: true
    },
    userhash: {
        type: String,
        required: true,
        maxLength: 200
    },
    activated: {
        type: Boolean,
        required: true,
        default: false
    },
    isbanned: {
        type: Boolean,
        required: true,
        default: false
    },
    banreason: {
        type: String,
        required: false,
        maxLength: 500
    },
    newpasswordkey: {
        type: String,
        required: false,
        maxLength: 50,
        default: null
    },
    newpasswordkeyrequested: {
        type: Boolean,
        required: true,
        default: false
    },
    activationemailkey: {
        type: String,
        required: true,
        maxLength: 100
    },
    emailkeyrequested: {
        type: Boolean,
        required: true,
        default: true
    },
    qrcode: {
        type: String,
        required: true,
        maxLength: 100,
        unique: true
    },
    lastip: {
        type: String,
        required: true,
        maxLength: 100
    },
    lastlogin: {
        type: String,
        required: true,
        maxLength: 100
    },
    accept_terms: {
        type: Boolean,
        required: true,
        default: false
    },
    accept_terms_date: {
        type: Date
    },
    isactive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });
authSchema.statics.Create = (authData) => {
    return new Auth(authData);
};
const Auth = mongoose_1.default.model('Auth', authSchema);
exports.Auth = Auth;

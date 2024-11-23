"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        required: true,
        maxLength: 200
    },
    lastname: {
        type: String,
        required: true,
        maxLength: 200
    },
    middlename: {
        type: String,
        required: false,
        maxLength: 200
    },
    avatar: {
        type: String,
        required: false,
        default: null,
        maxLength: 200
    },
    signature: {
        type: String,
        required: false,
        default: null,
        maxLength: 200
    },
    authid: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Authentication',
        required: true
    },
    email: {
        type: String,
        required: false,
        maxLength: 300,
        default: null
    },
    phone_ext: {
        type: Number,
        required: true,
        minLength: 1,
        maxLength: 4
    },
    phone_number: {
        type: Number,
        required: true,
        maxLength: 15,
        unique: true
    },
    phone_verified: {
        type: Boolean,
        required: true,
        default: false
    },
    allowphonedisplay: {
        type: Boolean,
        default: true
    },
    default_language: {
        //type: Schema.Types.ObjectId,
        //ref: 'Language',
        type: String,
        required: true,
        default: 'English'
    },
    default_currency: {
        type: String,
        //type: Schema.Types.ObjectId,
        //ref: 'Currency',
        required: true,
        default: 'USD'
    },
    role: {
        type: String,
        //type: Schema.Types.ObjectId,
        //ref: 'Role',
        required: true
    },
});
userSchema.statics.Create = (userData) => {
    return new User(userData);
};
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;

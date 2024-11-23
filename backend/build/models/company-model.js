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
exports.Company = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const companySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        maxLength: 200
    },
    logo: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        unique: true,
        default: null
    },
    headquarters: {
        type: String,
        required: false,
        default: null,
        maxLength: 500
    },
    phone_ext: {
        type: Number,
        required: false,
        default: null,
        maxLength: 5
    },
    phone_number: {
        type: Number,
        required: false,
        default: null,
        maxLength: 15
    },
    website: {
        type: String,
        required: false,
        maxLength: 200,
        unique: true,
        default: null
    },
    timezone: {
        type: String,
        required: true
    },
    postalcode: {
        type: String,
        required: false,
        maxLength: 10
    },
    taxid: {
        type: String,
        unique: true
    },
    taxverified: {
        type: Boolean,
        default: false
    },
    sellingdate: {
        type: Date,
        default: Date.now
    },
    apikey: {
        type: String,
        required: true,
        unique: true
    },
    owner_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true,
    }
});
companySchema.statics.Create = (companyData) => {
    return new Company(companyData);
};
const Company = mongoose_1.default.model('Company', companySchema);
exports.Company = Company;

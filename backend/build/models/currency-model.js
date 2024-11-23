"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const currencySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        maxLength: 3
    },
    symbol: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});
const Currency = mongoose_1.default.model('Currency', currencySchema);
exports.Currency = Currency;

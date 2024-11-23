"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const roleSchema = new mongoose_1.default.Schema({
    role: {
        type: String,
        required: true,
        unique: true
    },
    permission: {
        type: [String],
        required: true,
        unique: true,
        maxLength: 3
    }
});
const Role = mongoose_1.default.model('Role', roleSchema);
exports.Role = Role;

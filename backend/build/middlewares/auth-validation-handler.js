"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class AuthValidation {
    constructor() {
        this.regex = new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/);
        this.create = [
            (0, express_validator_1.body)('username')
                .notEmpty()
                .withMessage("username is required")
                .isString(),
            (0, express_validator_1.body)('email')
                .notEmpty()
                .withMessage("email cannot be empty!")
                .isEmail()
                .withMessage("this is not an email format"),
            (0, express_validator_1.body)('password')
                .notEmpty()
                .withMessage("password cannot be empty!")
                .isLength({ min: 8 })
                .withMessage("password cannot be less than 8 characters"),
        ];
    }
}
exports.default = new AuthValidation();

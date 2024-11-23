"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class UserValidation {
    constructor() {
        this.regex = new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/);
        this.create = [
            (0, express_validator_1.body)('firstname')
                .notEmpty()
                .withMessage("Please enter your firstname - This field cannot be empty!")
                .isString(),
            (0, express_validator_1.body)('lastname')
                .notEmpty()
                .withMessage("Please enter your lastname/surname - This field cannot be empty!")
        ];
    }
}
exports.default = new UserValidation();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class CompanyValidation {
    constructor() {
        this.regex = new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/);
        this.create = [
            (0, express_validator_1.body)('name')
                .notEmpty()
                .withMessage("Please enter Company Name")
                .isString(),
            (0, express_validator_1.body)('email')
                .notEmpty()
                .withMessage("Please enter company's email!")
        ];
    }
}
exports.default = new CompanyValidation();

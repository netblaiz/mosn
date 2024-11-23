"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyError = void 0;
const base_error_1 = require("./base-error");
class CompanyError extends base_error_1.BaseError {
    constructor(error) {
        super("Company Error");
        this.error = error;
        this.statusCode = 400;
        this.serializeErrors = () => {
            let formattedErrors = [{ message: this.error }];
            return formattedErrors;
        };
        Object.setPrototypeOf(this, CompanyError.prototype);
    }
}
exports.CompanyError = CompanyError;

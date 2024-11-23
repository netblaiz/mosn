"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const base_error_1 = require("./base-error");
class RequestValidationError extends base_error_1.BaseError {
    constructor(errors) {
        super("Validation Error");
        this.errors = errors;
        this.statusCode = 400;
        this.serializeErrors = () => {
            let formattedErrors = this.errors.map(error => {
                return {
                    //message: error.msg, field: error.param}
                    message: error.msg
                };
            });
            return formattedErrors;
        };
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
}
exports.RequestValidationError = RequestValidationError;

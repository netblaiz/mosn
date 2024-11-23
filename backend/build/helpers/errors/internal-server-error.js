"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
const base_error_1 = require("./base-error");
class InternalServerError extends base_error_1.BaseError {
    constructor(error) {
        super("Internal Server Error");
        this.statusCode = 500;
        this.serializeErrors = () => {
            let formattedErrors = [{ message: this.error }];
            return formattedErrors;
        };
        this.error = error ? error : "Interna; Server Error";
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}
exports.InternalServerError = InternalServerError;

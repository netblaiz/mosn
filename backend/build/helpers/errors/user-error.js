"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserError = void 0;
const base_error_1 = require("./base-error");
class UserError extends base_error_1.BaseError {
    constructor(error) {
        super("User Error");
        this.error = error;
        this.statusCode = 400;
        this.serializeErrors = () => {
            let formattedErrors = [{ message: this.error }];
            return formattedErrors;
        };
        Object.setPrototypeOf(this, UserError.prototype);
    }
}
exports.UserError = UserError;
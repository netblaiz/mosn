"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccessError = void 0;
const base_error_1 = require("./base-error");
class UserAccessError extends base_error_1.BaseError {
    constructor(error) {
        super("User Access Error");
        this.error = error;
        this.statusCode = 400;
        this.serializeErrors = () => {
            let formattedErrors = [{ message: this.error }];
            return formattedErrors;
        };
        Object.setPrototypeOf(this, UserAccessError.prototype);
    }
}
exports.UserAccessError = UserAccessError;

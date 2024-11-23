"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceNotFoundError = void 0;
const base_error_1 = require("./base-error");
class ResourceNotFoundError extends base_error_1.BaseError {
    constructor(error) {
        super(error);
        this.error = error;
        this.statusCode = 404;
        this.serializeErrors = () => {
            let formattedErrors = [{ message: this.error }];
            return formattedErrors;
        };
        Object.setPrototypeOf(this, ResourceNotFoundError.prototype);
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;

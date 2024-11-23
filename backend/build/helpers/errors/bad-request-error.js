"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const base_error_1 = require("./base-error");
class BadRequestError extends base_error_1.BaseError {
    constructor(reason) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.serializeErrors = () => {
            return [
                {
                    message: this.reason
                }
            ];
        };
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
exports.BadRequestError = BadRequestError;

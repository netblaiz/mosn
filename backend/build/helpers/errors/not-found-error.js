"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const base_error_1 = require("./base-error");
class NotFoundError extends base_error_1.BaseError {
    constructor() {
        super('Route Not Found');
        this.reason = 'Route Not found';
        this.statusCode = 404;
        this.serializeErrors = () => {
            return [
                { message: this.reason }
            ];
        };
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
exports.NotFoundError = NotFoundError;

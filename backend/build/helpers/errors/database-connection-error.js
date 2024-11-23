"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionError = void 0;
const base_error_1 = require("./base-error");
class DatabaseConnectionError extends base_error_1.BaseError {
    constructor(error) {
        super('error connecting to database!');
        this.error = error;
        this.reason = 'Database Not Connected';
        this.statusCode = 500;
        this.serializeErrors = () => {
            return [
                { message: this.reason }
            ];
        };
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
}
exports.DatabaseConnectionError = DatabaseConnectionError;

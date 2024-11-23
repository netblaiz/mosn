"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
const logger_1 = require("../../helpers/logger");
class BaseError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, BaseError.prototype);
    }
    logError() {
        let errorlog = `${this.message} ===>`;
        logger_1.logger.error(errorlog);
    }
}
exports.BaseError = BaseError;

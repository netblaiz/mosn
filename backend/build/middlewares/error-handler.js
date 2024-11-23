"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const base_error_1 = require("../helpers/errors/base-error");
const errorHandler = (error, req, res, next) => {
    if (error instanceof base_error_1.BaseError) {
        return res.status(error.statusCode).send({ errors: error.serializeErrors() });
    }
    else {
        console.log('Unknown Error');
        return res.status(500).send({ errors: [{ message: 'Something went wrong!' }] });
    }
};
exports.errorHandler = errorHandler;

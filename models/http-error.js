"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrorConstructor = void 0;
let HttpErrorConstructor = (message, statusCode) => {
    let error = new Error(message);
    error.statusCode = statusCode;
    return error;
};
exports.HttpErrorConstructor = HttpErrorConstructor;

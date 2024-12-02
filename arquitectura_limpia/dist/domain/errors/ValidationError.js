"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(errors, message) {
        super(message !== null && message !== void 0 ? message : '');
        this.errors = [];
        this.name = 'ValidationError';
        this.errors = errors !== null && errors !== void 0 ? errors : [];
    }
}
exports.ValidationError = ValidationError;

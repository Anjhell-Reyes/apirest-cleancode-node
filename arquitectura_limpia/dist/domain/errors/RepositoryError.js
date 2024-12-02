"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundRepositoryError = void 0;
class NotFoundRepositoryError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundRepositoryError';
    }
}
exports.NotFoundRepositoryError = NotFoundRepositoryError;

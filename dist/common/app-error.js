"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(code, message) {
        super();
        this.code = code;
        this.message = message;
    }
    toString() {
        return `Error: ${this.code} ${this.message}`;
    }
}
exports.AppError = AppError;
//# sourceMappingURL=app-error.js.map
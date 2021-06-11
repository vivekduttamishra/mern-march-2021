"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Exception extends Error {
    constructor(message, status = 400, error = null) {
        super(message);
        this.message = message;
        this.status = status;
        this.error = error;
        if (!this.error)
            this.error = {};
        if (!this.error.message)
            this.error.message = this.message;
        if (!this.error.status) {
            this.error.status = status;
        }
    }
    send(reqeust, response) {
        response.status(this.status).send(this.error);
    }
}
exports.default = Exception;

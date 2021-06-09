"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doneCallback = void 0;
const doneCallback = (actualCallback, done) => {
    return (...params) => {
        try {
            actualCallback(...params);
            done();
        }
        catch (err) {
            done(err);
        }
    };
};
exports.doneCallback = doneCallback;

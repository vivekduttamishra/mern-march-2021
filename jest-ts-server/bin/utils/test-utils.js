"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doneCallback = void 0;
const doneCallback = (cb, done) => {
    return (...params) => {
        try {
            cb(...params);
            done();
        }
        catch (err) {
            done(err);
        }
    };
};
exports.doneCallback = doneCallback;

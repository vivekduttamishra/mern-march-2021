"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPrimesEvents = exports.findPrimesPromise = exports.delay = exports.findPrimesCb = exports.isPrime = void 0;
const events_1 = require("events");
const isPrime = (number) => {
    if (number < 2)
        return false;
    for (let i = 2; i < number; i++)
        if (number % i === 0)
            return false;
    return true;
};
exports.isPrime = isPrime;
const findPrimesCb = (min, max, cb) => {
    setTimeout(() => {
        if (min >= max)
            return cb(new Error(`Invalid Range [${min}-${max}]`));
        let result = [];
        for (let i = min; i < max; i++) {
            if (exports.isPrime(i))
                result.push(i);
        }
        cb(null, result);
    }, 500);
};
exports.findPrimesCb = findPrimesCb;
const delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};
exports.delay = delay;
const findPrimesPromise = (min, max) => __awaiter(void 0, void 0, void 0, function* () {
    const result = [];
    yield exports.delay(100);
    if (min >= max)
        throw new Error(`Invalid Range [${min}-${max}]`);
    for (let i = min; i < max; i++) {
        if (exports.isPrime(i)) {
            yield exports.delay(100);
            result.push(i);
        }
    }
    return result;
});
exports.findPrimesPromise = findPrimesPromise;
const findPrimesEvents = (min, max) => {
    let emitter = new events_1.EventEmitter();
    let lo = min;
    let hi = Math.min(max, lo + 100);
    let index = 0;
    const iid = setInterval(() => {
        if (min >= max) {
            emitter.emit('error', new Error(`Invalid Range [${min}-${max}]`));
            return clearInterval(iid);
        }
        for (let i = lo; i < hi; i++) {
            if (exports.isPrime(i)) {
                index++;
                emitter.emit('prime', { index, prime: i, min, max });
            }
        }
        if (hi === max) {
            emitter.emit('end', { count: index, min, max });
            return clearInterval(iid);
        }
        lo = hi;
        hi = Math.min(max, lo + 100);
    }, 100);
    return emitter;
};
exports.findPrimesEvents = findPrimesEvents;

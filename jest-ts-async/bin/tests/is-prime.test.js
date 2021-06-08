"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const primes_1 = require("../utils/primes");
test('isPrime should return true for 2', () => {
    let result = primes_1.isPrime(2);
    expect(result).toBe(true);
});

test('isPrime should return false for 8', () => {
    expect(primes_1.isPrime(8)).toBeFalsy();
});

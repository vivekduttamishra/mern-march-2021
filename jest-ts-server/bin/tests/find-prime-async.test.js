"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const primes_1 = require("../utils/primes");
describe('Asynchronous Find Primes Tests', () => {
    test('findPrimesCallback should return 4 primes between 2 and 10', (done) => {
        jest.setTimeout(30000);
        primes_1.findPrimesCb(2, 10, (err, result) => {
            expect(result.length).toBe(10);
            done(); //let jest know work is really over
        });
    });
});

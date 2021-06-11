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
const primes_1 = require("../../utils/primes");
const test_utils_1 = require("../../utils/test-utils");
xdescribe('asyncrhonous findPrimes tests', () => {
    xdescribe('findPrimesCb Tests', () => {
        it('should return 4 primes between 2 and 10', (done) => {
            primes_1.findPrimesCb(2, 10, (err, result) => {
                try {
                    expect(err).toBeNull();
                    expect(result.length).toBe(4);
                    done();
                }
                catch (err) {
                    done(err);
                }
            });
        });
        it('should return 25 primes between 2 and 100', (done) => {
            primes_1.findPrimesCb(2, 100, test_utils_1.doneCallback((err, result) => {
                expect(err).toBeNull();
                expect(result.length).toBe(25);
            }, done));
        });
    });
    xdescribe('findPrimesEvents Tests', () => {
        it('should return 25 primes between 0 and 100', done => {
            primes_1.findPrimesEvents(0, 100)
                .on('prime', (e) => {
                console.log(e);
            })
                .on('end', test_utils_1.doneCallback((event) => {
                expect(event.count).toBe(25);
            }, done));
        });
    });
    describe('findPrimesPromise Tests', () => {
        it('should return 4 primes between 0 and 10', done => {
            primes_1.findPrimesPromise(2, 10)
                .then(test_utils_1.doneCallback((primes) => {
                expect(primes.length).toBe(4);
            }, done));
        });
        it('should return error for invalid range', done => {
            primes_1.findPrimesPromise(10, 2)
                .catch(test_utils_1.doneCallback((err) => {
                expect(err.message).toMatch(/Invalid Range/);
            }, done));
        });
        it('should return 25 primes between 0 and 100', () => {
            //a test need not use done if it is returning a Promise back
            //jest automatically waits for a promise
            return primes_1.findPrimesPromise(0, 100)
                .then((primes) => {
                expect(primes.length).toBe(25);
            });
        });
        it('should return 25 primes between 2 and 100', () => __awaiter(void 0, void 0, void 0, function* () {
            let primes = yield primes_1.findPrimesPromise(2, 100);
            expect(primes.length).toBe(25);
        }));
        it('should return all primes under 10', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(primes_1.findPrimesPromise(0, 10))
                .resolves.toEqual([2, 3, 5, 7]);
        }));
        it('should reject the invalid range', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(() => primes_1.findPrimesPromise(100, 1))
                .rejects
                .toThrow(/Invalid Range/);
        }));
    });
    describe('exception handling tests', () => {
        function test(value) {
            if (value % 2 === 0)
                return "hello world";
            else
                throw new Error('value must be even');
        }
        it('should return result for even numbers', () => {
            expect(test(10)).toStrictEqual("hello world");
        });
        it('should throw an error for not evens', () => {
            try {
                test(3);
            }
            catch (err) {
                expect(err.message).toMatch(/value must be even/);
            }
        });
        it('should throw an error for not evens test 2', () => {
            expect(() => test(3)).toThrow(/value must be even/);
        });
    });
});

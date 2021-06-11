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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../models/user"));
const utils_1 = require("ts-jest/utils");
const user_authentication_1 = require("../../services/user-authentication");
const exception_1 = __importDefault(require("../../utils/exception"));
jest.mock('../../models/user', () => {
    const userModel = {
        findOne: jest.fn(),
        create: jest.fn()
    };
    return jest.fn(() => userModel);
});
describe('user service tests', () => {
    let mockedGetUserModel = utils_1.mocked(user_1.default, true);
    describe('register function tests', () => {
        it('should fail to add records without valid fields', () => __awaiter(void 0, void 0, void 0, function* () {
            let user = { name: 'vivek', password: 'hello' };
            //await expect(register(user)).rejects.toThrow();
            try {
                yield user_authentication_1.register(user);
            }
            catch (err) {
                expect(err.error.requiredField).toStrictEqual('email');
                expect(err.status).toBe(400);
                expect(mockedGetUserModel).toHaveBeenCalledTimes(0);
            }
        }));
        it('should return a valid token for valid object created', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = { name: 'vivek', email: 'vivek@email.com', password: 'pass' };
            const create = mockedGetUserModel().create;
            create.mockClear();
            create.mockImplementation((user) => __awaiter(void 0, void 0, void 0, function* () {
                return yield Object.assign(Object.assign({}, user), { _id: 1 });
            }));
            let result = yield user_authentication_1.register(user);
            expect(create).toHaveBeenCalledTimes(1);
            expect(result).not.toBeNull();
            expect(result.email).toStrictEqual(user.email);
        }));
        it('should throw exception create fails', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = { name: 'vivek', email: 'vivek@email.com', password: 'pass' };
            const create = mockedGetUserModel().create;
            create.mockClear();
            create.mockImplementation(() => __awaiter(void 0, void 0, void 0, function* () {
                throw new exception_1.default('duplicate email', 400);
            }));
            try {
                let result = yield user_authentication_1.register(user);
            }
            catch (err) {
                expect(create).toHaveBeenCalledTimes(1);
                expect(err.message).toStrictEqual('duplicate email');
                expect(err.status).toBe(400);
            }
        }));
    });
});

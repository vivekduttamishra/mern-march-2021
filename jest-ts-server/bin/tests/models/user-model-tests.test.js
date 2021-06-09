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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
describe("user-model tests", () => {
    let connection = null;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log('process.env.NODE_ENV', process.env.NODE_ENV);
        //console.log('connecting to datbase');
        //await configureDb();
        console.log('connected...');
        connection = mongoose_1.default.connection;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        //console.log('disconnecting database');
        yield mongoose_1.default.connection.close();
    }));
    it('has 4 users in the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const UserModel = user_1.default();
        const users = yield UserModel.find();
        expect(users.length).toBe(4);
        //await expect(UserModel.countDocuments()).toBe(4);
    }));
    it('can create new user', () => {
        //console.log("testing create new user");
    });
    it('fails to create a new user with missing required fields', () => {
        // console.log("testing create new user failure");
    });
    it('returns user with valid email address', () => {
        // console.log("testing get valid user");
    });
    it('returns undefined with invalid email address', () => {
        // console.log("testing get invalid user");
    });
});

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
const mongoose_connection_1 = require("../../config/mongoose-connection");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
describe("user-model tests", () => {
    let connection = null;
    let UserModel = null;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log('process.env.NODE_ENV', process.env.NODE_ENV);
        //console.log('connecting to datbase');
        yield mongoose_connection_1.configureDb();
        UserModel = user_1.default();
        console.log('connected...');
        connection = mongoose_1.default.connection;
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.db.dropCollection("users");
        yield UserModel.create(new UserModel({ name: "Vivek", email: "vivek@email.com", password: "pass" }));
        yield UserModel.create(new UserModel({ name: "Admin", email: "admin@email.com", password: "pass" }));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        //console.log('disconnecting database');
        yield mongoose_1.default.connection.close();
    }));
    it('has 2 users in the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield UserModel.find();
        expect(users.length).toBe(2);
        //await expect(UserModel.countDocuments()).toBe(4);
    }));
    it('can create new user', () => __awaiter(void 0, void 0, void 0, function* () {
        //console.log("testing create new user");
        const name = "New Name";
        const user = yield UserModel.create(new UserModel({ name: name, email: "new@email.com", password: "pass" }));
        expect(user._id).not.toBeNull();
        let dbUser = yield UserModel.findById(user._id);
        expect(dbUser.name).toStrictEqual(name);
    }));
    it('fails to create a new user with missing required fields', () => __awaiter(void 0, void 0, void 0, function* () {
        // console.log("testing create new user failure");
        const name = "New Name";
        const user = new UserModel({ name: name, password: "pass" });
        // try{
        //     await UserModel.create(user);
        // }catch(err){
        //     console.log(err.message);
        //     expect(err).not.toBeNull();
        //     expect(err.message).toMatch(/Path `email` is required/);
        // }
        yield expect(UserModel.create(user)).rejects.toThrow(/Path `email` is required/);
    }));
    it('returns user with valid email address', () => {
        // console.log("testing get valid user");
    });
    it('returns undefined with invalid email address', () => {
        // console.log("testing get invalid user");
    });
});

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
const supertest_1 = __importDefault(require("supertest"));
//import {connect,closeDatabase,clearDatabase} from '../mongo-memory-connection';
const mongoose_connection_1 = require("../../config/mongoose-connection");
const express_config_1 = require("../../config/express-config");
const routes_config_1 = require("../../config/routes-config");
const movies_1 = __importDefault(require("../../models/movies"));
const mongoose_1 = __importDefault(require("mongoose"));
describe('testing api using supertest', () => {
    let movie1 = { name: "Sholey", synopsys: "great action movie", actors: ['amitabh-bachchan', 'dharmendra', 'hema-malini'] };
    let movie2 = { name: "Bagban", synopsys: "great movie", actors: ['amitabh-bachchan', 'hema-malini'] };
    let movie3 = { name: "Sita or Gita", synopsys: "great movie", actors: ['dharmendra', 'hema-malini'] };
    let MovieModel;
    let app;
    let movies;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        //here will configure our database and express
        //await connect();
        yield mongoose_connection_1.configureDb();
        //configure express app here
        app = express_config_1.configureExpress(__dirname);
        routes_config_1.configureRoutes(app);
        MovieModel = movies_1.default();
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        //await clearDatabase();
        try {
            yield mongoose_1.default.connection.db.dropCollection("movies");
            console.log('collection dropped');
        }
        catch (err) {
            console.log('collection not found');
        }
        //time to fill some dummy data
        yield MovieModel.create(new MovieModel(Object.assign({}, movie1)));
        yield MovieModel.create(new MovieModel(Object.assign({}, movie2)));
        yield MovieModel.create(new MovieModel(Object.assign({}, movie3)));
        movies = yield MovieModel.find();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    it('should return files related to valid url', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app).get('/test.txt');
        expect(response.status).toBe(200);
        expect(response.text).toStrictEqual('This is a test');
    }));
    it('should return 404 for invalid url', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app).get('/no-such-file.txt');
        expect(response.status).toBe(404);
    }));
    it('should return data for valid api call', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = movies[0]._id;
        const response = yield supertest_1.default(app).get(`/api/movies/${id}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toStrictEqual(movie1.name);
    }));
    it('should return 404 for invalid api request', () => __awaiter(void 0, void 0, void 0, function* () {
        let { id } = movies[0];
        let invalidId = id.substring(0, id.length - 4) + "0000";
        const response = yield supertest_1.default(app).get(`/api/movies/${invalidId}`);
        expect(response.status).toBe(404);
    }));
    it('should fail to add new movie from non-authenticated user', () => __awaiter(void 0, void 0, void 0, function* () {
        //try to create a movie without passing authentication token
        //verify status code should be 401
        //verify that the total movie count is same as before
    }));
    it('should add a movie successfully from an authentic user', () => __awaiter(void 0, void 0, void 0, function* () {
        //login user and collect the token
        //try to create user by passing token in the request header
        //verify status code
        //verify that return value has an id
        //verify we can access the newly created movie with the given id
    }));
});

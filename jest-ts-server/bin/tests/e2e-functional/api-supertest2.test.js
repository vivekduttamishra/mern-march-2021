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
//import app from './test-express';
const movies_1 = __importDefault(require("../../models/movies"));
const express_config_1 = require("../../config/express-config");
const routes_config_1 = require("../../config/routes-config");
const mongo_memory_connection_1 = require("../mongo-memory-connection");
describe('express server tests using supertest', () => {
    let MovieModel;
    let movies;
    let app;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongo_memory_connection_1.connect();
        MovieModel = movies_1.default();
        app = express_config_1.configureExpress(__dirname);
        routes_config_1.configureRoutes(app);
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongo_memory_connection_1.clearDatabase();
        yield MovieModel.create(new MovieModel({ name: "Sholey", synopsys: 'Great Acition Movie', actors: ['amitabh-bachchan', 'dharmendra', 'sanjeev-kumar', 'hema-maline', 'jaya-bachchan'] }));
        yield MovieModel.create(new MovieModel({ name: "Bagban", synopsys: 'Great Emotional Movie', actors: ['amitabh-bachchan', 'hema-maline'] }));
        movies = yield MovieModel.find();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongo_memory_connection_1.closeDatabase();
    }));
    it('should return static file', () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield supertest_1.default(app).get('/test.txt');
        expect(response.status).toBe(200);
        expect(response.text).toBe('This is a test');
    }));
    it('should return 404 for non available url', () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield supertest_1.default(app)
            .get('/not-available.txt');
        expect(response.status).toBe(404);
    }));
    it('should return valid movie with valid id', () => __awaiter(void 0, void 0, void 0, function* () {
        let { id } = movies[0];
        // console.log('id',id);
        let response = yield supertest_1.default(app).get(`/api/movies/${movies[0]._id}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(movies[0].name);
    }));
    it('should return 404 for invalid id', () => __awaiter(void 0, void 0, void 0, function* () {
        let { id } = movies[0];
        id = id.substring(0, id.length - 4) + "0000";
        console.log('id', id);
        let response = yield supertest_1.default(app).get(`/api/movies/${id}`);
        expect(response.status).toBe(404);
    }));
});

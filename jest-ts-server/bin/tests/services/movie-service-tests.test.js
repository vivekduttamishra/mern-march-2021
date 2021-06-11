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
const movies_1 = __importDefault(require("../../models/movies"));
//import { configureDb } from '../../config/mongoose-connection';
const mongo_memory_connection_1 = require("../mongo-memory-connection");
//import mongoose from 'mongoose';
const movie_service_1 = __importDefault(require("../../services/movie-service"));
describe('movie service tests', () => {
    let movie1 = { name: "Sholey", synopsys: "great action movie", actors: ['amitabh-bachchan', 'dharmendra', 'hema-malini'] };
    let movie2 = { name: "Bagban", synopsys: "great movie", actors: ['amitabh-bachchan', 'hema-malini'] };
    let movie3 = { name: "Sita or Gita", synopsys: "great movie", actors: ['dharmendra', 'hema-malini'] };
    let connection = null;
    let MovieModel = null;
    let movieService;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log('process.env.NODE_ENV', process.env.NODE_ENV);
        yield mongo_memory_connection_1.connect();
        console.log('connected to database');
        MovieModel = movies_1.default();
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongo_memory_connection_1.clearDatabase();
        console.log('database cleared');
        movie1 = yield MovieModel.create(new MovieModel(movie1));
        movie2 = yield MovieModel.create(new MovieModel(movie2));
        movie3 = yield MovieModel.create(new MovieModel(movie3));
        movieService = new movie_service_1.default(MovieModel);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        //console.log('disconnecting database');
        //await mongoose.connection.close();
        yield mongo_memory_connection_1.closeDatabase();
    }));
    it('returns all movies with getAllMovies()', () => __awaiter(void 0, void 0, void 0, function* () {
        let movies = yield movieService.getAllMovies();
        expect(movies.length).toBe(3);
        expect(movies[0].name).toStrictEqual(movie1.name);
    }));
    it('returns valid movie for valid id', () => __awaiter(void 0, void 0, void 0, function* () {
        let movie = yield movieService.getMovieById({ id: movie1._id });
        expect(movie1).not.toBeNull();
    }));
    it('should throw exception for invalid id', () => __awaiter(void 0, void 0, void 0, function* () {
        let invalidId = "00000" + movie1._id.toString().substring(4);
        // console.log('validid',movie1._id);
        // console.log('invalidId',invalidId);
        yield expect(movieService.getMovieById({ id: invalidId })).rejects.toThrow();
    }));
});

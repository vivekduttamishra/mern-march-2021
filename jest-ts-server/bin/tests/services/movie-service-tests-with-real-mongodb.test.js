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
const mongoose_connection_1 = require("../../config/mongoose-connection");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const movie_service_1 = __importDefault(require("../../services/movie-service"));
const exception_1 = __importDefault(require("../../utils/exception"));
dotenv_1.default.config();
describe('movie service tests', () => {
    let movie1 = { name: "Sholey", synopsys: "great action movie", actors: ['amitabh-bachchan', 'dharmendra', 'hema-malini'] };
    let movie2 = { name: "Bagban", synopsys: "great movie", actors: ['amitabh-bachchan', 'hema-malini'] };
    let movie3 = { name: "Sita or Gita", synopsys: "great movie", actors: ['dharmendra', 'hema-malini'] };
    let connection = null;
    let MovieModel = null;
    let movieService;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log('process.env.NODE_ENV', process.env.NODE_ENV);
        yield mongoose_connection_1.configureDb();
        MovieModel = movies_1.default();
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connection.db.dropCollection("movies");
            console.log('collection dropped');
        }
        catch (err) {
            console.log('collection not found');
        }
        movie1 = yield MovieModel.create(new MovieModel(movie1));
        movie2 = yield MovieModel.create(new MovieModel(movie2));
        movie3 = yield MovieModel.create(new MovieModel(movie3));
        movieService = new movie_service_1.default(MovieModel);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        //console.log('disconnecting database');
        yield mongoose_1.default.connection.close();
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
        yield expect(movieService.getMovieById({ id: invalidId })).rejects.toBeInstanceOf(exception_1.default);
    }));
});

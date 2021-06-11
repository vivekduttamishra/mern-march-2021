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
const exception_1 = __importDefault(require("../utils/exception"));
const model_1 = require("../utils/model");
class MovieService {
    constructor(movieModel) {
        this.movieModel = movieModel;
        this.getAllMovies = () => __awaiter(this, void 0, void 0, function* () {
            //console.log('in movie service getAllMovies');
            let movies = yield this.movieModel.find();
            return movies;
        });
        this.addMovie = (movie) => __awaiter(this, void 0, void 0, function* () {
            let result = yield this.movieModel.create(new this.movieModel(movie));
            return new model_1.Model(result, 201);
        });
        this.getMovieById = (params) => __awaiter(this, void 0, void 0, function* () {
            console.log('get movie by id params', params);
            let id = params.id;
            let movie = yield this.movieModel.findById(id);
            if (movie)
                return movie;
            else
                throw new exception_1.default("Movies Not Found", 404, { id });
        });
        this.removeMovieById = (params) => __awaiter(this, void 0, void 0, function* () {
            let id = params.id;
            let result = yield this.movieModel.findByIdAndRemove(id);
            if (!result)
                throw new exception_1.default("Movie Not Found", 404, { id });
            return new model_1.Model(null, 204);
        });
    }
}
exports.default = MovieService;

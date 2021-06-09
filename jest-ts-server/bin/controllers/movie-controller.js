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
class MovieController {
    constructor(movieModel) {
        this.movieModel = movieModel;
        this.getAllMovies = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let movies = yield this.movieModel.find();
                res.send(movies);
            }
            catch (ex) {
                console.log('getAllMovies', ex.message);
                res.status(500).send({ message: "internal server error", ex });
            }
        });
        this.addMovie = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let movie = new this.movieModel(req.body);
                let result = yield this.movieModel.create(movie);
                res.status(201).send(result);
            }
            catch (err) {
                console.log(err.message);
                res.status(400).send({ message: err.message, status: 400 });
            }
        });
        this.getMovieById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                let movie = yield this.movieModel.findById(id);
                if (movie)
                    res.status(200).send(movie);
                else
                    res.status(404).send({ message: 'movie not found', id });
            }
            catch (err) {
                res.status(500).send({ message: err.message });
            }
        });
        this.removeMovieById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                let result = yield this.movieModel.findByIdAndRemove(id);
                console.log('remove result', result);
                res.send(result);
            }
            catch (err) {
                res.status(500).send({ message: err.message });
            }
        });
    }
}
exports.default = MovieController;

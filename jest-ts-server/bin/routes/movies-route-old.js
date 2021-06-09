"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
exports.default = (movieController) => {
    const router = express_1.default.Router();
    router
        .route("/")
        .get(movieController.getAllMovies)
        .post(movieController.addMovie);
    router
        .route("/:id")
        .get(movieController.getMovieById)
        .delete(movieController.removeMovieById);
    return router;
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const generic_controller_1 = require("../controllers/generic-controller");
exports.default = (movieService) => {
    const router = express_1.default.Router();
    router
        .route("/")
        .get(generic_controller_1.handleRequest(movieService.getAllMovies))
        .post(generic_controller_1.handleRequest(movieService.addMovie));
    router
        .route("/:id")
        .get(generic_controller_1.handleRequest(movieService.getMovieById))
        .delete(generic_controller_1.handleRequest(movieService.removeMovieById));
    return router;
};

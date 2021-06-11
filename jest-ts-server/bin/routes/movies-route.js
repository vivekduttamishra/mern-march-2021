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
    router
        .route("/with-actor/:actor")
        .get((request, response) => __awaiter(void 0, void 0, void 0, function* () {
        //write your logic here
        //no controller or service avialable.
        //this is an untestable block of code
    }));
    return router;
};

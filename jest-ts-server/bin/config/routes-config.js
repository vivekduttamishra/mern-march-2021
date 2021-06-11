"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = void 0;
const movies_1 = __importDefault(require("../models/movies"));
const movie_controller_1 = __importDefault(require("../controllers/movie-controller"));
const movies_route_1 = __importDefault(require("../routes/movies-route"));
const movie_service_1 = __importDefault(require("../services/movie-service"));
const user_routes_1 = __importDefault(require("../routes/user-routes"));
const movies_route_old_1 = __importDefault(require("../routes/movies-route-old"));
const dummy_routes_1 = __importDefault(require("../routes/dummy-routes"));
const configureRoutes = (app) => {
    app.use('/api/users', user_routes_1.default());
    app.use('/api/dummy', dummy_routes_1.default());
    let movieModel = movies_1.default();
    let movieController = new movie_controller_1.default(movieModel);
    let movieService = new movie_service_1.default(movieModel);
    app.use('/api/movies', movies_route_1.default(movieService));
    app.use('/api/movies-old', movies_route_old_1.default(movieController));
};
exports.configureRoutes = configureRoutes;

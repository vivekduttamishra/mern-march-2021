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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const dummy_routes_1 = __importDefault(require("./routes/dummy-routes"));
const uploader_1 = __importDefault(require("./routes/uploader"));
//import './utils/extenstions';
const path_1 = __importDefault(require("path"));
const movies_1 = __importDefault(require("./models/movies"));
const movies_route_1 = __importDefault(require("./routes/movies-route"));
const movie_service_1 = __importDefault(require("./services/movie-service"));
const configureDb = () => __awaiter(void 0, void 0, void 0, function* () {
    let url = process.env.DB_URL;
    if (!url) {
        //build the cloud url with the required format
        url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
    }
    console.log('db url', url);
    //mongoose.connection.on('error',(error:any)=>console.log('error connecting to database',error));
    yield mongoose_1.default.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});
const configureExpress = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.use('', express_1.default.static(path_1.default.join(__dirname, `${process.env.OPT_STATIC_FILE_PATH}`)));
    app.use(express_1.default.json());
    app.use(cors_1.default());
    //app.use(authenticate);
    const uploadPath = path_1.default.join(__dirname, `${process.env.OPT_FILE_UPLOAD_PATH}`);
    app.use('/upload', uploader_1.default(uploadPath));
    app.use('/api/users', user_routes_1.default());
    app.use('/api/dummy', dummy_routes_1.default());
    //add your routes here
    let movieModel = movies_1.default();
    //let movieController=new MovieController(movieModel); 
    let movieService = new movie_service_1.default(movieModel);
    app.use('/api/movies', movies_route_1.default(movieService));
    return yield app;
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    dotenv_1.default.config();
    const port = process.env.PORT || 3000;
    console.log('connecting to database...');
    yield configureDb();
    console.log('database connected...');
    const app = yield configureExpress();
    const server = app.listen(port);
    server.on('error', (error) => console.log('error sarting the server:', error.message));
    return port;
});
start()
    .then(() => console.log(`server started on port: ${process.env.PORT}`))
    .catch((error) => console.log("error starting server", error.message));

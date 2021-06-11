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
const dotenv_1 = __importDefault(require("dotenv"));
const express_config_1 = require("./config/express-config");
const routes_config_1 = require("./config/routes-config");
const mongoose_connection_1 = require("./config/mongoose-connection");
const helper_1 = require("./utils/helper");
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    dotenv_1.default.config();
    console.log('process.env.NODE_ENV', process.env.NODE_ENV);
    console.log('connecting to database...');
    yield mongoose_connection_1.configureDb();
    console.log('database connected...');
    const app = express_config_1.configureExpress(__dirname);
    routes_config_1.configureRoutes(app);
    const port = helper_1.getEnv("PORT");
    const server = app.listen(port);
    server.on('error', (error) => console.log('error sarting the server:', error.message));
    return port;
});
start()
    .then((port) => console.log(`server started on port: ${port}`))
    .catch((error) => console.log("error starting server", error.message));

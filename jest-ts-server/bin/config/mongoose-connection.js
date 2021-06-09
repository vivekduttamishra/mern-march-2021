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
exports.configureDb = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const helper_1 = require("../utils/helper");
const configureDb = () => __awaiter(void 0, void 0, void 0, function* () {
    dotenv_1.default.config();
    //let url=process.env.DB_URL;
    let url = helper_1.getEnv("DB_URL");
    if (!url) {
        //build the cloud url with the required format
        let user = helper_1.getEnv("DB_USER");
        let password = helper_1.getEnv("DB_PASSWORD");
        let server = helper_1.getEnv("DB_SERVER");
        let database = helper_1.getEnv("DB_DATABASE");
        url = `mongodb+srv://${user}:${password}@${server}/${database}?retryWrites=true&w=majority`;
    }
    console.log('db url', url);
    //mongoose.connection.on('error',(error:any)=>console.log('error connecting to database',error));
    yield mongoose_1.default.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});
exports.configureDb = configureDb;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureExpress = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const uploader_1 = __importDefault(require("../routes/uploader"));
const dotenv_1 = __importDefault(require("dotenv"));
const configureExpress = (rootPath) => {
    dotenv_1.default.config();
    const app = express_1.default();
    app.use('', express_1.default.static(path_1.default.join(rootPath, `${process.env.OPT_STATIC_FILE_PATH}`)));
    app.use(express_1.default.json());
    app.use(cors_1.default());
    //app.use(authenticate);
    const uploadPath = path_1.default.join(rootPath, `${process.env.OPT_FILE_UPLOAD_PATH}`);
    app.use('/upload', uploader_1.default(uploadPath));
    //add your routes here
    return app;
};
exports.configureExpress = configureExpress;

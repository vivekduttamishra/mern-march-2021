"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const connect_busboy_1 = __importDefault(require("connect-busboy"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = (uploadPath) => {
    let router = express_1.default.Router();
    router.use(connect_busboy_1.default());
    // ... 
    router.post('/', function (req, res) {
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log('fieldname', fieldname);
            console.log('filename', filename);
            var fstream = fs_1.default.createWriteStream(`${uploadPath}/${filename}`);
            file.pipe(fstream);
            fstream
                .on('close', function () {
                res.status(201).send({ filename, fieldname });
            })
                .on('error', err => {
                res.status(400).send({ message: err.message });
            });
        });
    });
    return router;
};

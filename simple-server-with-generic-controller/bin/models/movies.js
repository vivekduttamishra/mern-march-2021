"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let _movieModel = null;
exports.default = () => {
    let schema = new mongoose_1.default.Schema({
        name: {
            type: String,
            required: true
        },
        synopsys: {
            type: String,
            required: true
        },
        actors: {
            type: [String]
        }
    });
    if (!_movieModel)
        _movieModel = mongoose_1.default.model('movies', schema);
    return _movieModel;
};

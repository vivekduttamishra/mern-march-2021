"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let _userModel = null;
exports.default = () => {
    let schema = new mongoose_1.default.Schema({
        name: {
            type: String,
            rquired: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            unique: true
        },
        roles: Array
    });
    if (!_userModel)
        _userModel = mongoose_1.default.model('users', schema);
    return _userModel;
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_authentication_1 = require("../services/user-authentication");
const helper_1 = require("../utils/helper");
exports.default = () => {
    const router = express_1.default.Router();
    router.use((request, response, next) => {
        console.log(request.method, request.url);
        next();
    });
    router
        .route('/login')
        .post(helper_1.requestHandler(user_authentication_1.login));
    router
        .route('/register')
        .post(helper_1.requestHandler(user_authentication_1.register));
    router.route('/user').get(user_authentication_1.authenticate, helper_1.requestHandler(user_authentication_1.getCurrentUser));
    return router;
};

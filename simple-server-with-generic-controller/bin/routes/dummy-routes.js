"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helper_1 = require("../utils/helper");
const user_authentication_1 = require("../services/user-authentication");
const routeInfo = (model, request) => {
    return {
        method: request.method,
        url: request.url,
        model,
        user: request.user,
        params: request.params
    };
};
exports.default = () => {
    let router = express_1.default.Router();
    //non authenticated routes
    router
        .route("/")
        .get(helper_1.requestHandler(routeInfo));
    router
        .route("/:id")
        .get(helper_1.requestHandler(routeInfo));
    //authenticated routes
    router.use(user_authentication_1.authenticate);
    router.route("/")
        .post(helper_1.requestHandler(routeInfo));
    router.route("/:id")
        .put(helper_1.requestHandler(routeInfo))
        .delete(helper_1.requestHandler(routeInfo));
    let adminRoute = user_authentication_1.authorize('admin');
    //admin routes
    router.use(adminRoute);
    router
        .route("/admin/home")
        .get(helper_1.requestHandler(routeInfo))
        .post(helper_1.requestHandler(routeInfo));
    return router;
};

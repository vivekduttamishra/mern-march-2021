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
exports.handleBodyRequest = exports.handleParamRequest = exports.handleRequest = void 0;
const exception_1 = __importDefault(require("../utils/exception"));
const model_1 = require("../utils/model");
const handleRequest = (service) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let body = req.body;
            let params = req.params;
            //do your business logic
            let result = null;
            console.log("req.method", req.method);
            if (req.method == "GET" || req.method == "DELETE") {
                console.log('params passed to GET request ', params);
                result = yield service(params, body, { req, res, next });
            }
            else
                result = yield service(body, params, { req, res, next });
            if (result instanceof model_1.Model) {
                return result.send(res);
            }
            if (!result)
                throw new exception_1.default("Not Found", 404, { params });
            res.send(result);
        }
        catch (ex) {
            if (ex instanceof exception_1.default) {
                console.log('returning smart exception', ex);
                ex.send(req, res);
            }
            else {
                console.log('returning generic ex', ex);
                res.status(400).send({ message: ex.message });
            }
        }
    });
};
exports.handleRequest = handleRequest;
//should pass only params
const handleParamRequest = (service) => {
};
exports.handleParamRequest = handleParamRequest;
//should pass only req body
const handleBodyRequest = (service) => {
};
exports.handleBodyRequest = handleBodyRequest;

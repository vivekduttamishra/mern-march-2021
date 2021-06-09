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
exports.getEnv = exports.requestHandler = exports.validateRequiredField = exports.Model = void 0;
const exception_1 = __importDefault(require("./exception"));
class Model {
    constructor(_model, status = 200) {
        this._model = _model;
        this.status = status;
    }
}
exports.Model = Model;
function validateRequiredField(model, ...requiredFields) {
    for (let field of requiredFields)
        if (!model[field])
            throw new exception_1.default("Missing Required Field", 400, { requiredField: field });
}
exports.validateRequiredField = validateRequiredField;
exports.requestHandler = ((fn) => {
    return (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(request.method, request.url, request.body);
            let result = yield fn(request.body, request, response, next);
            if (!result)
                response.end();
            if (result._model) {
                response.send(result._model).status(result.status || 200);
            }
            else {
                response.send(result);
            }
        }
        catch (error) {
            if (error.send) {
                error.send(request, response);
            }
            else {
                response.send({ message: error.message, error }).send(400);
            }
        }
    });
});
const getKey = (name) => {
    for (const key in process.env) {
        if (key === name) {
            console.log('found key', key);
            return process.env[key];
        }
    }
    return undefined;
};
const getEnv = (name) => {
    const env = process.env.NODE_ENV;
    if (!env) {
        console.log('returning neutral value', process.env[name]);
        return process.env[name];
    }
    const key = name + "_" + env.toLocaleUpperCase().trim();
    console.log('searching key', key);
    let value = process.env[key];
    //let value:any=getKey(key);
    console.log(key, value);
    if (value)
        return value;
    console.log("checking for netural value");
    value = process.env[name];
    console.log(name, value);
    return value;
};
exports.getEnv = getEnv;

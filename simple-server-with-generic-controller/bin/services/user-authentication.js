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
exports.getCurrentUser = exports.login = exports.register = exports._authenticate = exports.authenticate = exports.authorize = exports.verifyUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const exception_1 = __importDefault(require("../utils/exception"));
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helper_1 = require("../utils/helper");
dotenv_1.default.config();
const verifyUser = (request) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.headers.authorization)
        throw new exception_1.default("No Authorization Header", 401);
    const token = request.headers.authorization.split(' ')[1];
    if (!token)
        throw new exception_1.default("No Authorization Header", 401);
    const tokenUser = yield jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
    const dbUser = yield user_1.default().findById(tokenUser.id);
    if (!dbUser)
        throw new exception_1.default('Invalid Credentials', 401);
    else {
        request.user = dbUser;
        return dbUser;
    }
});
exports.verifyUser = verifyUser;
const authorize = (...roles) => {
    return (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield exports.verifyUser(request);
            console.log(user, roles);
            if (!roles.length)
                return next(); //nothing to authorize
            if (!user.roles || !user.roles.length)
                throw new exception_1.default("User not authorized for the action", 403);
            let match = roles.anyMatch(user.roles);
            if (match)
                return next();
            else
                throw new exception_1.default("User not authorzied for the action", 403);
        }
        catch (error) {
            if (error.send)
                error.send(request, response);
            else
                response.status(401).send({ message: error.message });
        }
    });
};
exports.authorize = authorize;
const authenticate = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.verifyUser(request);
        return next();
    }
    catch (error) {
        if (error.send)
            error.send(request, response);
        else
            response.status(401).send({ message: error.message });
    }
});
exports.authenticate = authenticate;
const _authenticate = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = user_1.default();
        console.log('request.headers', request.headers);
        if (!request.headers.authorization)
            throw new exception_1.default("No Authorization Header", 401);
        const token = request.headers.authorization.split(' ')[1];
        console.log('token', token);
        if (!token)
            throw new exception_1.default("No Authorization Header", 401);
        const tokenUser = yield jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
        console.log('token user', tokenUser);
        const dbUser = yield User.findById(tokenUser.id);
        if (!dbUser)
            throw new exception_1.default('Invalid Credentials', 401);
        else {
            request.user = tokenUser;
            console.log('request.user', request.user);
        }
        next();
    }
    catch (err) {
        //console.log('authentication middleware error',err.message);
        if (err.send)
            yield err.send(request, response);
        else
            yield response.status(401).send({ message: err.message });
    }
});
exports._authenticate = _authenticate;
const register = (user) => __awaiter(void 0, void 0, void 0, function* () {
    helper_1.validateRequiredField(user, "name", "password", "email");
    const User = user_1.default();
    try {
        user.password = yield bcrypt_1.default.hash(user.password, 10);
        console.log('user', user);
        let result = yield User.create(new User(user));
        console.log('result', result);
        return _generateToken(result);
    }
    catch (error) {
        throw new exception_1.default(error.message, 400);
    }
});
exports.register = register;
const login = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    //  console.log('credentials',credentials);
    helper_1.validateRequiredField(credentials, "email", "password");
    const User = user_1.default();
    let user = yield User.findOne({ email: credentials.email });
    if (!user)
        throw new exception_1.default("invalid username/password", 401);
    //  console.log('db user',user);
    let match = yield bcrypt_1.default.compare(credentials.password, user.password);
    if (match) {
        return _generateToken(user);
    }
    else {
        throw new exception_1.default("invalid username/password", 401);
        //return response.status(401).json({success:false,message:'Incorrect Password'});
    }
});
exports.login = login;
const getCurrentUser = (model, request) => __awaiter(void 0, void 0, void 0, function* () {
    let user = request.user;
    return { name: user.name, email: user.email, roles: user.roles };
});
exports.getCurrentUser = getCurrentUser;
function _generateToken(user) {
    const token = jsonwebtoken_1.default.sign({ id: user._id, name: user.name, email: user.email }, `${process.env.JWT_SECRET}`, { expiresIn: '1D' });
    return { name: user.name, email: user.email, roles: user.roles, token };
}

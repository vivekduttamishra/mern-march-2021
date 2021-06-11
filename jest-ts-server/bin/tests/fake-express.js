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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeExpress = void 0;
class FakeExpress {
    constructor(request) {
        this.request = request;
        this.responseData = '';
        this.response = {
            statusCode: 200,
            status: jest.fn().mockImplementation((code) => {
                this.response.statusCode = code;
                return this.response;
            }),
            json: jest.fn().mockImplementation((param) => {
                this.responseData = param;
                return this.response;
            }),
            send: jest.fn().mockImplementation((data) => {
                console.log('send got', data);
                this.responseData = data;
                return this.response;
            }),
            cookie: jest.fn(),
            clearCookie: jest.fn()
        };
    }
    handleRequest(fn) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fn(this.request, this.response);
        });
    }
    get(fn) {
        return __awaiter(this, void 0, void 0, function* () {
            this.request.method = "GET";
            yield fn(this.request, this.response);
        });
    }
    post(fn) {
        return __awaiter(this, void 0, void 0, function* () {
            this.request.method = "POST";
            yield fn(this.request, this.response);
        });
    }
}
exports.FakeExpress = FakeExpress;

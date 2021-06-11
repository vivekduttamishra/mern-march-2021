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
const axios_1 = __importDefault(require("axios"));
describe('testing api using supertest', () => {
    const baseurl = 'http://localhost:9000';
    it('should return files related to valid url', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`${baseurl}/test.txt`);
        expect(response.status).toBe(200);
        expect(response.data).toBe('This is a test file');
    }));
    it('should return 404 for invalid url', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(axios_1.default.get(`${baseurl}/no-file.txt`)).rejects.toThrow();
    }));
    it('should return data for valid api call', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`${baseurl}/api/movies/60a766cd3f6ce0b9dcb68700`);
        expect(response.status).toBe(200);
        expect(response.data.name).toStrictEqual("Chupke Chupke");
    }));
    it('should return 404 for invalid api request', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`${baseurl}/}/api/movies/60a766cd3f6ce0b9dcb60000`);
        }
        catch (err) {
            console.log(err);
            expect(err.response.status).toBe(404);
        }
    }));
});

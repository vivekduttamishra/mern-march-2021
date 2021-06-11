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
const movie_controller_1 = __importDefault(require("../../controllers/movie-controller"));
const fake_express_1 = require("../fake-express");
const movieModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn()
};
describe('movie controller tests', () => {
    let movieController;
    beforeEach(() => {
        movieModel.findById.mockClear();
        movieController = new movie_controller_1.default(movieModel);
    });
    it('should get a valid movie by id', () => __awaiter(void 0, void 0, void 0, function* () {
        let request = { params: { id: 1 } };
        let express = new fake_express_1.FakeExpress(request);
        movieModel.findById.mockResolvedValue({
            id: 1,
            name: 'Sholey'
        });
        yield express.handleRequest(movieController.getMovieById);
        expect(express.response.statusCode).toBe(200);
        console.log('express.responseData', express.responseData);
        expect(express.responseData.name).toStrictEqual('Sholey');
    }));
    it('should get 404 response for invalid id', () => __awaiter(void 0, void 0, void 0, function* () {
        let request = { params: { id: 1 } };
        let express = new fake_express_1.FakeExpress(request);
        movieModel.findById.mockResolvedValue(undefined);
        yield express.handleRequest(movieController.getMovieById);
        expect(express.response.statusCode).toBe(404);
        expect(express.responseData.id).toStrictEqual(1);
    }));
});

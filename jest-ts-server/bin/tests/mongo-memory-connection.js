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
exports.clearDatabase = exports.closeDatabase = exports.connect = void 0;
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    const uri = yield mongod.getConnectionString();
    const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000
    };
    yield mongoose.connect(uri, mongooseOpts);
});
exports.connect = connect;
const closeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connection.dropDatabase();
    yield mongoose.connection.close();
    yield mongod.stop();
});
exports.closeDatabase = closeDatabase;
const clearDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        yield collection.deleteMany();
    }
});
exports.clearDatabase = clearDatabase;

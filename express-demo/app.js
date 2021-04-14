"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const express= require('express');
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = express_1.default();
//let bodyParser= require('body-parser');
app.use(body_parser_1.default.json()); //express middleware 
var books = [
    { title: 'The Accursed God', author: 'Vivek Dutta Mishra' },
    { title: 'Rashmirathi', author: 'Ramdhari Singh Dinkar' },
    { title: 'Kane and Abel', author: 'Jeffrey Archer' }
];
app.get('/books', function (req, res) {
    res.send(books);
});
app.post('/books', function (req, res) {
    //res.send(req.body);
    books.push(req.body); //req.body added by podyParser
    res.status(201).send(req.body);
});
var port = 3000;
app.listen(port, function (err) {
    if (err)
        console.log('error starting server', port);
    else
        console.log('server started on port', port);
});

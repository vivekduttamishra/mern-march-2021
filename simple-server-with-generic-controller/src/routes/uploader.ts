import express, { request } from 'express';
import { requestHandler } from '../utils/helper';
import { authenticate, authorize } from '../services/user-authentication';
import userRoutes from './user-routes';
import fs from 'fs';
import busboy from 'connect-busboy';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';



export default (uploadPath: string) => {

    let router = express.Router();

    router.use(busboy());

    // ... 

    router.post('/', function (req:any, res:any) {
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname:any, file:any, filename:any) {
            console.log('fieldname',fieldname);
            console.log('filename',filename);
            
            
            var fstream = fs.createWriteStream(`${uploadPath}/${filename}`);
            file.pipe(fstream);
            fstream
            .on('close', function () {
                res.status(201).send({filename,fieldname});
            })
            .on('error',err=>{
                res.status(400).send({message:err.message});
            })
            
        });
    });

    return router;


};
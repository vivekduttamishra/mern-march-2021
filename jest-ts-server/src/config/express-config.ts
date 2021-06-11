import express from 'express';
import cors from 'cors';
import path from 'path';
import getUploader from '../routes/uploader';
import dotenv from 'dotenv';

export const configureExpress = (rootPath:string) => {
    dotenv.config();
    const app = express();
    app.use('', express.static(path.join(rootPath, `${process.env.OPT_STATIC_FILE_PATH}`)))
    app.use(express.json());
    app.use(cors());
    //app.use(authenticate);
    const uploadPath= path.join(rootPath,`${process.env.OPT_FILE_UPLOAD_PATH}`);
    app.use('/upload',getUploader(uploadPath));    
    //add your routes here

    return app;
}
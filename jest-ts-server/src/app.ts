import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import {authenticate} from './services/user-authentication';
import userRoutes from './routes/user-routes';
import dummyRoutes from './routes/dummy-routes';
import getUploader from './routes/uploader';
//import './utils/extenstions';
import path from 'path';
import getMovieModel from './models/movies';
import MovieController from './controllers/movie-controller';
import getMovieRoute from './routes/movies-route';
import MovieService from './services/movie-service';
import {configureDb} from './config/mongoose-connection';
import {getEnv} from './utils/helper';

console.log('server starting...');
console.log(`Current environment setting is '${process.env.NODE_ENV}'`);


const configureExpress = async () => {
    const app = express();
    app.use('', express.static(path.join(__dirname, `${process.env.OPT_STATIC_FILE_PATH}`)))
    app.use(express.json());
    app.use(cors());
    //app.use(authenticate);
    const uploadPath= path.join(__dirname,`${process.env.OPT_FILE_UPLOAD_PATH}`);
    app.use('/upload',getUploader(uploadPath));
    app.use('/api/users',userRoutes());
    app.use('/api/dummy',dummyRoutes());
    //add your routes here

    let movieModel=getMovieModel();
    //let movieController=new MovieController(movieModel); 
    let movieService=new MovieService(movieModel);
    app.use('/api/movies', getMovieRoute(movieService));

 

    return await app;
}

const start = async () => {
    dotenv.config();
    let port = getEnv("PORT") || 2000;
    
    console.log('process.env.NODE_ENV',process.env.NODE_ENV);
    

   

    console.log('port',port);
    
    console.log('connecting to database...');
    await configureDb();
    console.log('database connected...');

    const app = await configureExpress();
    const server = app.listen(port);
    server.on('error', (error: any) => console.log('error sarting the server:', error.message));
    return port;

  
};

start()
    .then((port) => console.log(`server started on port: ${port}`))
    .catch((error: any) => console.log("error starting server", error.message));
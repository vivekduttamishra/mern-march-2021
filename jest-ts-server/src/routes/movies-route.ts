import express from "express";
import {handleRequest} from '../controllers/generic-controller';


export default (movieService:any)=>{

    const router=express.Router();
 
    router
        .route("/")
        .get(handleRequest(movieService.getAllMovies))
        .post(handleRequest(movieService.addMovie));

    
    router
        .route("/:id")
        .get(handleRequest(movieService.getMovieById))
        .delete(handleRequest(movieService.removeMovieById));

        


    return router;

};
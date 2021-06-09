import express from "express";


export default (movieController:any)=>{

    const router=express.Router();
 
    router
        .route("/")
        .get(movieController.getAllMovies)
        .post(movieController.addMovie);

    
    router
        .route("/:id")
        .get(movieController.getMovieById)
        .delete(movieController.removeMovieById);

        


    return router;

};
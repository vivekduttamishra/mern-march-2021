import express, { request } from 'express';
import {requestHandler} from '../utils/helper';
import {authenticate,authorize} from '../services/user-authentication';
import userRoutes from './user-routes';

const routeInfo=(model:any,request:any)=>{
    return {
        method:request.method,
        url:request.url,
        model,
        user:request.user,
        params:request.params
    }
}


export default ()=>{

    let router=express.Router();

    //non authenticated routes
    router
        .route("/")
        .get(requestHandler(routeInfo));

    router
        .route("/:id")
        .get(requestHandler(routeInfo));


    //authenticated routes
    router.use(authenticate);

    router.route("/")
          .post(requestHandler(routeInfo));

    router.route("/:id")
         .put(requestHandler(routeInfo))
         .delete(requestHandler(routeInfo));
        
    
    let adminRoute=authorize('admin');
    //admin routes
    router.use(adminRoute)
    router
        .route("/admin/home")        
        .get(requestHandler(routeInfo))
        .post(requestHandler(routeInfo));
        
        
    return router;


};
import express from 'express';
import {login,register,authenticate,getCurrentUser} from '../services/user-authentication';
import {requestHandler} from '../utils/helper';

export default ()=>{

    const router=express.Router();

    router.use((request:any,response:any, next:any)=>{
        console.log(request.method,request.url);
        next();
    });

    router
        .route('/login')
        .post(requestHandler(login));

    router
        .route('/register')
        .post(requestHandler(register));

    router.route('/user').get(authenticate,requestHandler(getCurrentUser));

    return router;
}
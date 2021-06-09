import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {getEnv} from '../utils/helper';


export const configureDb = async () => {
    dotenv.config();
    //let url=process.env.DB_URL;

    let url:any=getEnv("DB_URL");   



    if(!url){
        //build the cloud url with the required format
        let user:any=getEnv("DB_USER");
        let password:any=getEnv("DB_PASSWORD");
        let server:any=getEnv("DB_SERVER");
        let database:any=getEnv("DB_DATABASE");
        url=`mongodb+srv://${user}:${password}@${server}/${database}?retryWrites=true&w=majority`
    }
    console.log('db url',url); 
    
    //mongoose.connection.on('error',(error:any)=>console.log('error connecting to database',error));
    await mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true});

    
}
import dotenv from 'dotenv';
//import './utils/extenstions';
import path from 'path';
import {configureExpress} from './config/express-config';
import {configureRoutes} from './config/routes-config';
import {configureDb} from './config/mongoose-connection';
import {getEnv} from './utils/helper';




const start = async () => {
    dotenv.config();
    console.log('process.env.NODE_ENV',process.env.NODE_ENV);

    console.log('connecting to database...');
    await configureDb();
    console.log('database connected...');
   
   
    const app = configureExpress(__dirname);
    configureRoutes(app);

    const port=getEnv("PORT");
    const server = app.listen(port);
    server.on('error', (error: any) => console.log('error sarting the server:', error.message));
    return port;

  
};

start()
    .then((port) => console.log(`server started on port: ${port}`))
    .catch((error: any) => console.log("error starting server", error.message));
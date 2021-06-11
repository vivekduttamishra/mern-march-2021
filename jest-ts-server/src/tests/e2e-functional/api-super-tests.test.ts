import request from 'supertest' ;
//import {connect,closeDatabase,clearDatabase} from '../mongo-memory-connection';
import {configureDb} from '../../config/mongoose-connection';
import {configureExpress} from '../../config/express-config';
import {configureRoutes} from '../../config/routes-config';
import getMovieModel from '../../models/movies';
import mongoose from 'mongoose';

   
describe('testing api using supertest',()=>{
    let movie1: any = { name: "Sholey", synopsys: "great action movie", actors: ['amitabh-bachchan', 'dharmendra', 'hema-malini'] };
    let movie2: any = { name: "Bagban", synopsys: "great movie", actors: ['amitabh-bachchan', 'hema-malini'] };
    let movie3: any = { name: "Sita or Gita", synopsys: "great movie", actors: ['dharmendra', 'hema-malini'] };
    let MovieModel:any;
    let app:any;
    let movies:any[];
    beforeAll(async()=>{

        //here will configure our database and express

        //await connect();
        await configureDb();
        //configure express app here
        app=configureExpress(__dirname);
        configureRoutes(app);

        MovieModel=getMovieModel();

    });

    beforeEach(async()=>{
        //await clearDatabase();
        try {
            await mongoose.connection.db.dropCollection("movies");
            console.log('collection dropped');
        } catch (err) {
            console.log('collection not found');
        }

        //time to fill some dummy data
        
        await MovieModel.create(new MovieModel({...movie1}));
        await MovieModel.create(new MovieModel({...movie2}));
        await MovieModel.create(new MovieModel({...movie3}));
        
        movies=await MovieModel.find();

    })

    afterAll(async()=>{
        await mongoose.connection.close();
    })

    it('should return files related to valid url',async()=>{
       
        const response= await request(app).get('/test.txt');

        expect(response.status).toBe(200);
        expect(response.text).toStrictEqual('This is a test');
    });
   
    it('should return 404 for invalid url',async()=>{
        
        const response=await request(app).get('/no-such-file.txt');
        expect(response.status).toBe(404);
        
    })
    it('should return data for valid api call',async()=>{
        const id=movies[0]._id;
        const response=await request(app).get(`/api/movies/${id}`);

        expect(response.status).toBe(200); 
        expect(response.body.name).toStrictEqual(movie1.name);
    })

    it('should return 404 for invalid api request',async()=>{

        let {id}= movies[0];
        let invalidId: any=id.substring(0,id.length-4)+"0000";
        const response=await request(app).get(`/api/movies/${invalidId}`);
        expect(response.status).toBe(404);
        

        
    })

    it('should fail to add new movie from non-authenticated user',async()=>{
        //try to create a movie without passing authentication token
        //verify status code should be 401
        //verify that the total movie count is same as before
    });

    it('should add a movie successfully from an authentic user',async()=>{

        //login user and collect the token
        //try to create user by passing token in the request header
        //verify status code
        //verify that return value has an id
        //verify we can access the newly created movie with the given id
    });
})
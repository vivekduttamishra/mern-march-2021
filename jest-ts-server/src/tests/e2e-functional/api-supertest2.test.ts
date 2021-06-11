import request from 'supertest';
//import app from './test-express';
import getMovieModel from '../../models/movies';
import {configureExpress} from '../../config/express-config';
import {configureRoutes} from '../../config/routes-config'
import {connect, closeDatabase,clearDatabase} from '../mongo-memory-connection';
 
describe('express server tests using supertest',()=>{

    let MovieModel:any;
    let movies:any[];
    let app:any;
    
    beforeAll(async ()=>{
        await connect();
        MovieModel=getMovieModel();

        app=configureExpress(__dirname);
        configureRoutes(app);

        
    });

    beforeEach(async()=>{
        await clearDatabase();
        await MovieModel.create(new MovieModel({ name: "Sholey",  synopsys:'Great Acition Movie', actors:['amitabh-bachchan','dharmendra','sanjeev-kumar','hema-maline','jaya-bachchan']}));
        await MovieModel.create(new MovieModel({ name: "Bagban",  synopsys:'Great Emotional Movie', actors:['amitabh-bachchan','hema-maline']}));
        movies=await MovieModel.find();
        
    });

    afterAll(async()=>{
        await closeDatabase();
    });


    it('should return static file',async ()=>{
        let response=await request(app).get('/test.txt');
        
        
        expect(response.status).toBe(200);
        expect(response.text).toBe('This is a test');
    });

    it('should return 404 for non available url',async()=>{
        let response=await request(app)
                            .get('/not-available.txt');

       expect(response.status).toBe(404);
    });

    it('should return valid movie with valid id',async()=>{
        let {id}= movies[0];
       // console.log('id',id);
        
        let response=await request(app).get(`/api/movies/${movies[0]._id}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(movies[0].name);
    });

    it('should return 404 for invalid id',async()=>{
        let {id}= movies[0];
        id=id.substring(0,id.length-4)+"0000";

        console.log('id',id);
        
        let response=await request(app).get(`/api/movies/${id}`);
        expect(response.status).toBe(404);
        
    });

});


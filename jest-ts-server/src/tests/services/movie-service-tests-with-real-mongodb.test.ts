import getMovieModel from '../../models/movies';
import { configureDb } from '../../config/mongoose-connection';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MovieService from '../../services/movie-service';
import Exception from '../../utils/exception';
dotenv.config();

describe('movie service tests', () => {

    let movie1: any = { name: "Sholey", synopsys: "great action movie", actors: ['amitabh-bachchan', 'dharmendra', 'hema-malini'] };
    let movie2: any = { name: "Bagban", synopsys: "great movie", actors: ['amitabh-bachchan', 'hema-malini'] };
    let movie3: any = { name: "Sita or Gita", synopsys: "great movie", actors: ['dharmendra', 'hema-malini'] };
    let connection: any = null;
    let MovieModel: any = null;
    let movieService: MovieService;

    beforeAll(async () => {
        console.log('process.env.NODE_ENV', process.env.NODE_ENV);
        await configureDb();
        MovieModel = getMovieModel();

    });

    beforeEach(async () => {
        try {
            await mongoose.connection.db.dropCollection("movies");
            console.log('collection dropped');
        } catch (err) {
            console.log('collection not found');
        }

        movie1 = await MovieModel.create(new MovieModel(movie1));
        movie2 = await MovieModel.create(new MovieModel(movie2));
        movie3 = await MovieModel.create(new MovieModel(movie3));
        movieService = new MovieService(MovieModel);
    });

    afterAll(async () => {
        //console.log('disconnecting database');
        await mongoose.connection.close();
    });

    it('returns all movies with getAllMovies()', async () => {

        let movies = await movieService.getAllMovies();

        expect(movies.length).toBe(3);
        expect(movies[0].name).toStrictEqual(movie1.name);
    });

    it('returns valid movie for valid id',async()=>{
        let movie=await movieService.getMovieById({id:movie1._id});
        expect(movie1).not.toBeNull();
    });

    it('should throw exception for invalid id',async()=>{
        let invalidId= "00000"+movie1._id.toString().substring(4);
        // console.log('validid',movie1._id);
        // console.log('invalidId',invalidId);

        await expect(movieService.getMovieById({id:invalidId})).rejects.toBeInstanceOf(Exception);
                    
    })





});


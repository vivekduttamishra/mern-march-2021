import getMovieModel from '../models/movies';
import MovieController from '../controllers/movie-controller';
import getMovieRoute from '../routes/movies-route';
import MovieService from '../services/movie-service';
import userRoutes from '../routes/user-routes';
import getOldMovieRoute from '../routes/movies-route-old';
import dummyRoutes from '../routes/dummy-routes';


export const configureRoutes=(app:any)=>{
    app.use('/api/users',userRoutes());
    app.use('/api/dummy',dummyRoutes());
    let movieModel=getMovieModel();
    let movieController=new MovieController(movieModel); 
    let movieService=new MovieService(movieModel);
    app.use('/api/movies', getMovieRoute(movieService));
    app.use('/api/movies-old',getOldMovieRoute(movieController));
}
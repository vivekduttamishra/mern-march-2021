import Exception from '../utils/exception';
import {Model} from '../utils/model';

export default class MovieService{
 

    constructor(private movieModel:any){  }

    getAllMovies=async ()=>{
        //console.log('in movie service getAllMovies');
        let movies=await this.movieModel.find();
        return movies;
        
    }

    addMovie=async (movie:any)=>{       
        let result=await this.movieModel.create(new this.movieModel(movie));
        return new Model(result,201);
    }
    
    getMovieById=async (params:any)=>{
        console.log('get movie by id params',params);
        let id=params.id;
        let movie=await this.movieModel.findById(id);
        if(movie)
            return movie;
        else
            throw new Exception("Movies Not Found",404,{id});
        
        
    }

    removeMovieById=async (params:any)=>{
        
       
        let id=params.id;
        let result=await this.movieModel.findByIdAndRemove(id);
        if(!result)
            throw new Exception("Movie Not Found",404,{id});
        return new Model(null,204);            
       
    }


}
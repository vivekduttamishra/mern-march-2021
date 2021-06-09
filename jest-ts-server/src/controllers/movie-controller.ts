

export default class MovieController{


    constructor(private movieModel:any){  }

    getAllMovies=async (req:any, res:any)=>{
        try{
            let movies=await this.movieModel.find();
            res.send(movies);
        } catch(ex){
            console.log('getAllMovies',ex.message); 
            res.status(500).send({message:"internal server error",ex});
        }
    }

    addMovie=async (req:any, res:any)=>{
        try{
            let movie=new this.movieModel(req.body);
            let result=await this.movieModel.create(movie);
            res.status(201).send(result);
        } catch(err){
            console.log(err.message);
            res.status(400).send({message:err.message,status:400});
        }
    }
    
    getMovieById=async (req:any, res:any)=>{
        try{
            let id=req.params.id;
            let movie=await this.movieModel.findById(id);
            if(movie)
                res.status(200).send(movie);
            else
                res.status(404).send({message:'movie not found',id});
            
        }catch(err){
            res.status(500).send({message:err.message});
        }
    }

    removeMovieById=async (req:any, res:any)=>{
        try{
            let id=req.params.id;
            let result=await this.movieModel.findByIdAndRemove(id);
            console.log('remove result',result);
            res.send(result);
        }catch(err){
            res.status(500).send({message:err.message});
        }
    }


}
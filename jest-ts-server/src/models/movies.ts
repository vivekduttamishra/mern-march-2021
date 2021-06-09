import mongoose from 'mongoose';

let _movieModel:any=null;

export default ()=>{

    let schema = new mongoose.Schema({
        
        name:{
            type:String,
            required:true
            
        },
        synopsys:{
            type:String,
            required:true
        },
        
        actors:{
            type:[String]
        }
        
    });
    if(!_movieModel)
        _movieModel= mongoose.model('movies',schema);

    return _movieModel
}
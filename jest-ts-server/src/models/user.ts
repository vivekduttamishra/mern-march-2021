import mongoose from 'mongoose';

let _userModel:any=null;

export default ()=>{

    let schema = new mongoose.Schema({
        name:{
            type:String,
            rquired:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            unique:true
        },
        roles:Array
        
    });
    if(!_userModel)
        _userModel= mongoose.model('users',schema);

    return _userModel
}
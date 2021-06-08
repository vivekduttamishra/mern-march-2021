import { connect } from "http2";

export const doneCallback = (cb:Function,done:Function)=>{

    return (...params:any[])=>{
        try{
            cb(...params);
            done();
        }catch(err){
            done(err);
        }
    }
};
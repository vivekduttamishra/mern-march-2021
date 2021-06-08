
export const doneCallback=(actualCallback:Function,done:Function)=>{
    return (...params:any[])=>{
        try{
            actualCallback(...params);
            done();
        }catch(err){
            done(err);
        }
    }
}
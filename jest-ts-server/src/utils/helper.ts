import Exception from './exception';

export class Model{
    constructor(public _model:any, public status:number=200){}
}

export function validateRequiredField(model:any, ...requiredFields: string[] ) {
    for (let field of requiredFields)
        if (!model[field])
            throw new Exception("Missing Required Field", 400,  { requiredField: field });
}

export const requestHandler=(  (fn:Function) =>{

    return async (request:any,response:any,next:any)=>{

        try{
            console.log(request.method,request.url,request.body);
            
            let result=await fn(request.body, request, response, next);
            if(!result)
                response.end();
            
            if(result._model){
                response.send(result._model).status(result.status||200);
            } else{
                response.send(result);
            }
        }catch(error){
            if(error.send){
                error.send(request,response);
            } else{
                response.send({message:error.message,error}).send(400);
            }
        }

    }
});


const getKey=(name:string)=>{
    for(const key in process.env){
        if(key===name){
            console.log('found key',key);
            return process.env[key];
        }
    }
    return undefined;
}



export const getEnv=(name:string)=>{
    const env=process.env.NODE_ENV;
    

    if(!env){
        console.log('returning neutral value',process.env[name]);
        return process.env[name];
    }
    const key=name+"_"+env.toLocaleUpperCase().trim();
    console.log('searching key',key);

     let value= process.env[key];  
    //let value:any=getKey(key);
    
    console.log(key,value);
    
    if(value)
        return value;

    console.log("checking for netural value");
    value=process.env[name];
    console.log(name,value);
    return value;
}
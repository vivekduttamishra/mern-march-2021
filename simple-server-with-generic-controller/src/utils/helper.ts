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
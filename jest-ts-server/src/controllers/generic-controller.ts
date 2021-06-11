
import Exception from '../utils/exception';

import {Model} from '../utils/model';


export const handleRequest =  (service:Function) =>{

        return async (req:any,res:any,next:any)=>{

            try{
        
                let body=req.body;
                let params=req.params;
        
                //do your business logic
                let result=null;
                console.log("req.method",req.method);

                if(req.method=="GET" || req.method=="DELETE"){
                    console.log('params passed to GET request ',params);                    
                    result=await service(params,body,{req,res,next});
                }
                else
                    result=await service(body,params,{req,res,next});
                    
                if(result instanceof Model){

                    return result.send(res);
                }

                if(!result)
                    throw new Exception("Not Found",404,{params});

                res.send(result);
        
        
            } catch(ex:any){

                if(ex instanceof Exception){
                    console.log('returning smart exception',ex);
                    ex.send(req, res);
                }
                else{
                    console.log('returning generic ex',ex);
                    res.status(400).send({message:ex.message});        
                }
            }
        
        
        }


}


//should pass only params
export const handleParamRequest=(service:Function)=>{

}
//should pass only req body
export const handleBodyRequest=(service:Function)=>{

}


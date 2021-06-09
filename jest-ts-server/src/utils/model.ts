export class Model{

    constructor(private model:any, private status:number=200){        
    }

    send(res:any){
        if(this.status===0)
            return; //response is already sent.
        //send the response
        res.status(this.status).send(this.model);
    }

    public static readonly resolved= new Model(null,0);

}
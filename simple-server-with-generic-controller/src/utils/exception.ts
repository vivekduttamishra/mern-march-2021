export default class Exception{
    constructor( public message:String, public status:number=400,public error:any=null){
        if(!this.error)
            this.error={}
        if(!this.error.message)
            this.error.message=this.message;

        if(!this.error.status){
            this.error.status=status;
        }
    }   

    send(reqeust:any, response:any){
        response.status(this.status).send(this.error);
    }

}
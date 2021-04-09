const {EventEmitter} = require('events');



const clock=(interval=100)=>{

   
    const emitter=new EventEmitter();
    let stopRequest=false;

    emitter.on('stop',()=>stopRequest=true);

    //async job
    const iid=setInterval(()=>{
        if(stopRequest){
            return clearInterval(iid);
        }
            
        const date=new Date();
        emitter.emit('tick',date);

      
    },interval);

    return emitter;
}


module.exports = clock;
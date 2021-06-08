import {EventEmitter} from 'events';


export const isPrime=(number:any)=>{
    if(number<2)
        return false;
    for(let i=2;i<number;i++)
        if(number%i===0)
            return false;

    return true;
}


export const findPrimesCb=(min:number,max:number,cb:Function)=>{

    setTimeout(()=>{
        if(min>=max)
            return cb(new Error(`Invalid Range [${min}-${max}]`));

        let result=[];
        
        for(let i=min;i<max;i++){
            if(isPrime(i))
                result.push(i);
        }

        cb(null,result);

    },500);
}

export const delay=(time:number)=>{
            return  new Promise((resolve:any)=>setTimeout(resolve,time));
};

export const findPrimesPromise=async (min:number,max:number)=>{
    const result=[];
    await delay(100);
    if(min>=max) 
        throw new Error(`Invalid Range [${min}-${max}]`);

    for(let i=min;i<max;i++){
        if(isPrime(i)){
            await delay(100);
            result.push(i);
        }          

    }
    return result;
}


export const findPrimesEvents =  (min:number,max:number)=>{

    let emitter=new EventEmitter();
    let lo=min;
    let hi=Math.min(max, lo+100);
    let index=0;

    const iid:any=setInterval( () => {
        if(min>=max){
            emitter.emit('error',new Error(`Invalid Range [${min}-${max}]`));
            return clearInterval(iid);
        }    

        for(let i=lo;i<hi;i++){
            
            if(isPrime(i)){
                index++;
                emitter.emit('prime',{index,prime:i,min,max});
            }
        }

        if(hi===max){
            emitter.emit('end', {count:index,min,max})
            return clearInterval(iid);
        }

        lo=hi;
        hi=Math.min(max,lo+100);  

    },100);

    return emitter;

}

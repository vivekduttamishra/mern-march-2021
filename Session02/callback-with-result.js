
const throwTheDice=(callback)=>{

    setTimeout(()=>{
        let value= Math.floor(Math.random()*6)+1;
        callback(value);
    },2000);

}
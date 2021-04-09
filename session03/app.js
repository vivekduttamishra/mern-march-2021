
const clock=require('./lib/clock');

let event= clock(1000);

event.on('tick', d => {
    console.log(`${d.getHours()}  : ${d.getMinutes()} : ${d.getSeconds()}`);
});

event.on('stop',()=>console.log('clock stopped'));

setTimeout(()=>{
    event.emit('stop');
},10000);




function multiplierOf(number){

    let multiply= function(by){
        return number*by;
    }

    return multiply;
}


let m19= multiplierOf(19);   //closure remember 19

let m23= multiplierOf(23);  //closure remember 23


//how many parameter are we passing to this function?
//Answer: 2
//19 is now remembered as a closure parameter
//5 is the additional parameter
let x= m19(5) ;   //19x5

console.log('x',x);



console.log('m23(5)',m23(5));  //115

console.log('m19(5)',m19(5));  //95








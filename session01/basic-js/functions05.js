//In browser 'window' object is global context 
//In Nodejs there is an unnamed global context 


//this function is added to global context of nodejs or window object of browser
function plus(a,b){
    return a+b;
}

//this variable is also added to global context/ window
let sum=plus;


console.log('plus.name',plus.name);
console.log('sum.name',sum.name);

//difference is added to the global context
//but minus is assigned to difference not to global context
//therefore minus is never added to global context
//it can't be accessed hereafter
let difference= function minus(a,b){return a-b;};

console.log('difference.name',difference.name);

// 'minus' is not available for use
//console.log('minus.name',minus.name);


//we can also have anonymous functions


let multiply = function (x,y) {return x*y; };  //without its name, it takes the name to first reference

console.log('multiply.name',multiply.name);


console.log('multiply(21,3)',multiply(21,3));




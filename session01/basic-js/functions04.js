
function plus(a,b){
    return a+b;
}

console.log('plus(2,3)',plus(2,3)); //we are calling the function

console.log('plus',plus);  //without (), a function name is just a reference 

console.log('typeof(plus)',typeof(plus)); //to a function object

let sum=plus; //we can assign a function to a reference

console.log('sum(5,2)',sum(5,2));


//functions are objects. they have their properties

console.log('sum.name',sum.name); //every function has a property called name





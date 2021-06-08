"use strict";
/*
    HOW IS CLOUSURE CREATED
      a. you have a outer function that may take some parameter (generally takes some)
      b. it defines an inner function that may takes it's own parameters
      c. it returns the inner function
      
    WHY DO WE USE CLOSURE
    
    A Closure can ---

    a. help us pass additional parameters.
    b. help us perform additional actionss around any given function.
*/
function outer(param1) {
    let hostLocal = "host local";
    function closure(param2) {
        console.log('param1', param1);
        console.log('hostLocal', hostLocal);
        console.log('param2', param2);
        return param1 * param2;
    }
    return closure;
}
//how do we use closure?
//step 1: we call the outer to get the actual function we want to use
let fn = outer(2); //we are actually trying to get a real function here...
//step 2: we now call the real function.
let result = fn(3);
console.log('result', result);

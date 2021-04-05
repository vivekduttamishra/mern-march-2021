

//normal function call

function greet(){
    console.log('hello world');
}

//no output unless you call it


//IIFE  --> Immediately Invocable Function Expression
// You can define a function and call it immediately without waiting
// This function can be called only once.
// IFFE syntax  is  ( function ) ();

(function welcome(){
    console.log('welcome to IIFE')
}) (); 
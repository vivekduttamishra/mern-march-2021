//Closure
// function plus and minus are internal to getOperator

function getOperator(symbol){

    //everytime getOperator is called, it redfines a new plus()  and minus() function
    // two different calls to getOperator() will return different plus() functions not the same one
    function plus(a,b){return a + b; }

    function minus(a,b) { return a-b; }

    if(symbol==='+')
        return plus;
    else
        return minus;
}

let o1= getOperator('+'); //returns the function 'plus'
let o2=getOperator('+'); //return the function 'plus'
console.log('o1(5,2)',o1(5,2));
console.log('o2(5,2)',o2(5,2));

console.log('o1.name',o1.name);
console.log('o2.name',o2.name);


console.log('o1===o2',o1===o2); //false

//you can't function body or local variable inside function
//from outside
console.log('getOperator.plus',getOperator.plus);

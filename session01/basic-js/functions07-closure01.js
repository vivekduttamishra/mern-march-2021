//This is not a closure. Just to understand function returning function
//Next example will be closure

function plus(a,b){return a + b; }

function minus(a,b) { return a-b; }

function getOperator(symbol){
    if(symbol==='+')
        return plus;
    else
        return minus;
}

let o1= getOperator('+'); //returns the function 'plus'

console.log('o1.name',o1.name);

console.log('o1(5,2)',o1(5,2));


let o2=getOperator('-'); //returns the function 'minus'

console.log('o2(5,2)',o2(5,2));


let o3=getOperator('+'); //return the function 'plus'

console.log('o1===o3',o1===o3); //true

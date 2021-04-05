
function average(x,y){

    return (x+y)/2;
}

console.log('average(2,11)',average(2,11));

console.log('average(2,11,9,17,7,4,4,1000,3)',average(2,11,9,17,7,4,4,1000,3));

console.log('average(1)',average(1)); // (1+undefined)/2 ---> NAN/2 ---> NAN

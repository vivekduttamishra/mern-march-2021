
function average(a,b) {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++)
        sum += arguments[i];

    return sum / arguments.length;
}

console.log('average(2,11)', average(2, 11));

console.log('average(2,11,9,17,7,4,4,1000,3)', average(2, 11, 9, 17, 7, 4, 4, 1000, 3));

console.log('average(1)', average(1)); // (1+undefined)/2 ---> NAN/2 ---> NAN

"use strict";
let plus = (number1, number2) => number1 + number2;
let greet = (name) => console.log('Hello ', name, 'welcome to our service');
let factorial = (x) => {
    if (x < 2)
        return x;
    else
        return x * factorial(x - 1);
};
const track = (fn) => {
    let _times = 0;
    let inner = (...params) => {
        _times++;
        return fn(...params);
    };
    let times = () => _times;
    //remember every function itself is an object
    //now inner function as a times function attached to it
    inner.times = times;
    inner.resetCounter = () => _times = 0;
    return inner;
};
plus = track(plus);
greet = track(greet);
console.log('plus(2,3)', plus(2, 3));
console.log('plus(7,1)', plus(7, 1));
console.log('plus(8,2)', plus(8, 2));
greet("Javascript");
greet("Typescript");
greet("MERN");
greet.resetCounter();
greet("Closures");
//how many times we called plus?
console.log(`plus called for ${plus.times()} times`);
//how many times we greeted someone?
console.log(`greet called for ${greet.times()} times`);
factorial = track(factorial);
console.log('factorial(5)', factorial(5));
//how many times factorial is called?
console.log(`factorial is called for ${factorial.times()} times(s)`);

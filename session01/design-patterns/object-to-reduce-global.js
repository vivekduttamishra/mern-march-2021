

const MathLib= function(){

    const plus=(a,b)=>a+b;
    const minus=(a,b)=>a-b;
    this.plus=plus;
    this.minus=minus;
    this.multiply=(a,b)=>a*b;
    this.divide=(a,b)=>a/b;

}

//now we can call these function by creating an object and calling it


let lib=new MathLib();
let lib2=new MathLib();

console.log('lib.plus(2,2)',lib.plus(2,2));
console.log('lib.minus(2,2)',lib.minus(2,2));
console.log('lib.multiply(2,2)',lib.multiply(2,2));
console.log('lib.divide(2,2)',lib.divide(2,2));






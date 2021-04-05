

const MathLib= (function(){
        

        const plus=(a,b)=>a+b;
        const minus=(a,b)=>a-b;
        
        const multiply=(a,b)=>a*b;
        const divide=(a,b)=>a/b;

        return {
                plus,
                minus,
                multiply,
                divide
        }

})();

//now MathLib is the object that contains all the necessary functions


console.log('MathLib.plus(5,15)',MathLib.plus(5,15));

console.log('MathLib.minus(5,15)',MathLib.minus(5,15));














//callback is a function that is passed as a parameter to other function so that it can invoke it when it likes


/* calculator calculates and prints the result 
 *  arg1 and arg2 are numbers on which calcuation should happen
 *  operator is a function that will do the calculation and display output
 */

const calculator= function (arg1, operator, arg2){

    let result= operator(arg1,arg2);

    console.log(`${arg1} ${operator.name} ${arg2} = ${result}`);

}

const plus= function (a,b){return a+b; }

const minus= (a,b) => a-b;

calculator(50,plus,15);
calculator(50, minus,15);

calculator(50, function(a,b){return a*b}, 15);

calculator(50, (a,b)=> a/b ,  15);


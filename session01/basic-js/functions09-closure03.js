
function outer(oparam){

    let olocal= oparam*10;

    function inner(iparam){
        console.log(`oparam=${oparam}\tolocal=${olocal}\tiparam=${iparam}`);
        
    }

    return inner;
}

let i1 = outer(10);  //returns inner. inner closure scope includes oparam=10, olocal=100

let i2 = outer(50);  //return inner. inner closure scope includes oparam=50, local=500


i1(1);  //oparam=10, olocal=100, iparam=1

i2(2); //oparam=50, olocal=500, iparam=2





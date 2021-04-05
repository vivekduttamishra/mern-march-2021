//make fields private using closure

function createPerson(name,email) {
    let p1 = new Object(); //{}

    //name and email are avaialble as part of closure scope
    //name and email are accessible in this block
    //but not by outsider

    p1.eat = function (food) {
        console.log(`${name}  eats ${food}`)
    }

    p1.getEmail=() => email;


    p1.getName= function(){
        return name;
    };

    return p1;

}

let v=createPerson('Vivek','vivek@conceptarchitect.in');
let s=createPerson('Shivanshi','shivanshi@gmail.com');

v.eat('Lunch');
s.eat('Lunch');

//console.log('v.name',v.name); //name is part of closure not part of object directly

console.log('v.getName()',v.getName());
console.log('v.getEmail()',v.getEmail());







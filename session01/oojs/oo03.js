//how to attach behavior to javascript

function createPerson(name,email) {
    let p1 = new Object(); //{}
    
    //this value will be visible to user of p1
    //they can see and change it
    p1.name = name;
    p1.email = email;

    p1.eat = function (food) {
        console.log(`${this.name}  eats ${food}`)
    }

    return p1;

}

let v=createPerson('Vivek','vivek@conceptarchitect.in');
let s=createPerson('Shivanshi','shivanshi@gmail.com');

v.eat('Lunch');
s.eat('Lunch');

console.log('v.email',v.email);
console.log('s.email',s.email);



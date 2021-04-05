//how to attach behavior to javascript


let p1=new Object(); //{}
p1.name='Vivek';
p1.email='vivek@conceptarchitect.in';
p1.eat=function(food){
    console.log(`${this.name}  eats ${food}`)
}
console.log('p1',p1);
p1.eat('Lunch');

let p2={
    name:"Shivanshi",
    email:"shivanshi@gmail.com",
    eat:function(food){
        console.log(`${this.name}  eats ${food}`)
    }
};

console.log('p2',p2);
p2.eat('Maggi');


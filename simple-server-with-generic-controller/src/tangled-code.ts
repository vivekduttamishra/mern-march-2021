/* 
    HOW IS CLOUSURE CREATED 
      a. you have a outer function that may take some parameter (generally takes some)
      b. it defines an inner function that may takes it's own parameters
      c. it returns the inner function 
      
    WHY DO WE USE CLOSURE 
    
    A Closure can ---

    a. help us pass additional parameters.
    b. help us perform additional actionss around any given function.
*/

namespace tangledcode{
    const delay=(time:number)=>new Promise(resolve=>setTimeout(resolve,time));

    const getBookById=async (id:string)=>{    
    
        //performance measure code part 1
        const start=new Date().getTime(); //BUG FIX 1:  new Date().getUTCMilliseconds();
    
        //actual business logic part 1
        await delay(Math.floor(Math.random()*2000));
        const result={id,title:'The Accursed God'};
    
        //performance measure code part 2
        const end= new Date().getTime(); //BUG FIX 2:new Date().getMilliseconds();
        console.log(`getBookById(${id}) took ${end-start} ms`);
    
        //actual business logic part 2
        return result;
    }
    
    const getAllBooks=async()=>{
    
        //performance logic part 1
        const start=new Date().getTime(); //BUG FIX 3: new Date().getUTCMilliseconds();
        await delay(Math.floor(Math.random()*2000));
    
        //business logic part 1
        const result=[
            {id:"1",title:'The Accursed God'},
            {id:"2",title:'Rashmirathi'},
        ];
    
        //performance logic part 2
        const end= new Date().getTime(); //BUG FIX 4:new Date().getMilliseconds();
        console.log(`getAllBook() took ${end-start} ms`);
    
        //business logic part 2
        return result;
    }
    
    async function main(){
        const book=await getBookById("5");
        console.log('book',book);
    
        const books=await getAllBooks();
        console.log('books',books);
        
        
    }
    
    main();
}





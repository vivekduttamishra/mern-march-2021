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

namespace untangledcode{

    const delay=(time:number)=>new Promise(resolve=>setTimeout(resolve,time));

    const measurePeformance=  ( fn : any )=>{

        let inner= async (...params:any[])=>{
            //performance measure code part 1
            const start= new Date().getTime() //BUG FIX 1: new Date().getUTCMilliseconds();

            //actual business logic part 1
            const result= await  fn(...params);

            //performance measure code part 2
            const end= new Date().getTime(); //BUG FIX 2: new Date().getMilliseconds();
            console.log(`total time taken ${end-start} ms`);

             //actual business logic part 2
            return result;
 
        }

        return inner;

    }

    let getBookById:any=async (id:string)=>{    

        await delay(Math.floor(Math.random()*2000));
        return {id,title:'The Accursed God'};

    }

    let getAllBooks:any=async()=>{

        await delay(Math.floor(Math.random()*2000));
        return [
            {id:"1",title:'The Accursed God'},
            {id:"2",title:'Rashmirathi'},
        ];
        
    }

    async function main(){

        console.log('getAllBooks',getAllBooks);
        getAllBooks= measurePeformance(getAllBooks);
        console.log('getAllBooks',getAllBooks);
        
        
        const books=await getAllBooks();
        console.log('books',books);

        getBookById=measurePeformance(getBookById);
        const book=await getBookById("24");
        console.log('book',book);
        
        
        
    }

    main();


}



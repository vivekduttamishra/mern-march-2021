
//BookManager is going to be  a singleton model

const getBookManager = (function(){

   //this function is not available outside 
   //nobody can create an object of this type
   function BookManager(){
       let books=[];

       this.addBook= book => books.push(book);

       this.getBookById = id => books.find(book=>book.id===id);

       this.getAllBooks = () => books;
   }

   let manager=null;

   function getBookManager(){
       if(!manager)
            manager=new BookManager(); //create only if it doesn't exist
        
        return manager;
   }

   return getBookManager; //return this function

})();   //the function is called and it returns getBookManger function


//let m1=new BookManager();  //this funciton doesn't exist on the scope
//let m2=new BookManager();

let m1=getBookManager();  //creates the BookManager object immediately
let m2=getBookManager();  //returns the old BookManager object without creating

m1.addBook({id:1, title:'The Accursed God'});
m1.addBook({id:2, title:'The Count of Monte Cristo'});
m2.addBook({id:3, title:'Rashmirathi'});


m1.getAllBooks().forEach(b=>console.log(b));

console.log('m1===m2',m1===m2);



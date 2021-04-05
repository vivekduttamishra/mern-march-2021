function BookManager(){
    let books=[];

    this.addBook= book => books.push(book);

    this.getBookById = id => books.find(book=>book.id===id);

    this.getAllBooks = () => books;
}

let m1=new BookManager();
let m2=new BookManager();

m1.addBook({id:1, title:'The Accursed God'});
m1.addBook({id:2, title:'The Count of Monte Cristo'});
m2.addBook({id:3, title:'Rashmirathi'});


m1.getAllBooks().forEach(b=>console.log(b));

console.log('m1===m2',m1===m2);



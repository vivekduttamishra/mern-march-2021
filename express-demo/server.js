const express= require('express');


let app=express();
let bodyParser= require('body-parser');

app.get('/', function(req, res){
    res.send('Welcome to the server');
});

app.use(bodyParser.json()); //express middleware 

let books=[
    {title:'The Accursed God',author:'Vivek Dutta Mishra'},
    {title:'Rashmirathi',author:'Ramdhari Singh Dinkar'}

]

app.get('/books',(req,res)=>{
    res.send(books);
});
 
app.post('/books',(req,res)=>{

    //res.send(req.body);
    books.push(req.body);  //req.body added by podyParser
    res.status(201).send(req.body);
});



const port=3000;
app.listen(port,err=>{
    if(err)
        console.log('error starting server',port);
    else
        console.log('server started on port',port);
})
//const express= require('express');
import express from 'express';
import bodyParser from 'body-parser';

let app=express();
//let bodyParser= require('body-parser');


app.use(bodyParser.json()); //express middleware 

let books=[
    {title:'The Accursed God',author:'Vivek Dutta Mishra'},
    {title:'Rashmirathi',author:'Ramdhari Singh Dinkar'},
    {title:'Kane and Abel',author:'Jeffrey Archer'}
]

app.get('/books',(req:any,res:any)=>{
    res.send(books);
});
 
app.post('/books',(req:any,res:any)=>{

    //res.send(req.body);
    books.push(req.body);  //req.body added by podyParser
    res.status(201).send(req.body);
});



const port=3000;
app.listen(port,(err:any)=>{
    if(err)
        console.log('error starting server',port);
    else
        console.log('server started on port',port);
})
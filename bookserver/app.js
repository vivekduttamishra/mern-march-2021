const http=require('http');
//---- business logic
const books=[
    {id:855,title:'The Accursed God', author:'Vivek Dutta Mishra', rating:4.9},
    {id:442,ttile:'The Count of Monte Cristo',author:'Alexadre Dumas',rating:4.5}
];

const homeRouteHandler=(request,response)=>{
    response.end('welcome to book server');
}
const bookListRouteHandler=(request,response)=>{
    response.end(JSON.stringify( books));
}

const bookDetailsRouteHandler=(request,response)=>{
    let parts=request.url.split('/');
    response.end('details for book id' +parts[parts.length-1]);
}

const notFoundRouteHandler =(request,response)=>{
    response.end(`not found : ${request.url}`)
}
 

//--- server logic
const requestHandler=(request,response)=>{

    console.log(`received ${request.method} ${request.url}`);
    if(request.url==='/')
        return homeRouteHandler(request,response);
    else if(request.url==='/books')
        return bookListRouteHandler(request,response);   
    else if(request.url && request.url.length>1 && request.url.indexOf('/book')===0){
       return bookDetailsRouteHandler(request,response);
    } else 
        return notFoundRouteHandler(request,response);
}  

let server = http.createServer(requestHandler);

server.on('error',error=>console.log('error starting server', error.message));

const port=5000;

server.listen(port, (err)=>{
    if(!err){
        console.log('server running on port ',port);
    }
});
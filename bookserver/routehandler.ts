interface RouteHandler{
    ismatch(request):boolean; //find if given route is a match
    handle(request,response):boolean; //handle the request
}

class BookListRouteHandler{

}

class BookDetailsRouteHandler{

}

class BookDeleteRouteHandler{

    
}
import * as Constants from './constants';

interface BookReducerState{
    books:any[];
    selectedBook:any|null;
}

const bookReducer=(state:BookReducerState,action:any)=>{

    switch(action.type){
        case Constants.ACTION_BOOK_FETCH:
            return {
                ...state,
                books:action.payload
            }
        case Constants.ACTION_BOOK_SELECT:
            return {
                ...state,
                selectedBook:action.payload
            }

        case Constants.ACTION_BOOK_ADD:
            return {
                ...state,
                books:[...state.books,action.payload]
            }

        case Constants.ACTION_BOOK_DELETE:
            return {
                ...state,
                books: state.books.filter(b=>b.isbn!==action.payload)
            }

    }


    return state;
}



export const allBooksReducer=(state:any[]=[],action:any)=>{
    //console.log('allbookreducer received',action);
    switch(action.type){
        case Constants.ACTION_BOOK_FETCH:
            return action.payload;
       
        case Constants.ACTION_BOOK_ADD:
            return [...state,action.payload];

        case Constants.ACTION_BOOK_DELETE:
            return  state.filter(b=>b.isbn!==action.payload)
 
    }


    return state;
}

export const selectedBookReducer=(selectedBook:any=null, action:any)=>{
  //  console.log('selectedbookreducer received',action);
    switch(action.type){
        case Constants.ACTION_BOOK_SELECT:
            console.log('selected book ', action.payload);
            return action.payload;

        case Constants.ACTION_BOOK_ADD:
            return action.payload;  //NEWLY added book automatically becomes selected book

        case Constants.ACTION_BOOK_DELETE:
            return null;

    }

    return selectedBook;
}


export default bookReducer;

import {BookManager} from '../services/book-service';

import * as Constants from './constants';


const manager=new BookManager();

export const  getAllBooks=async ()=>{
    let books= await manager.getAll();
    return {type: Constants.ACTION_BOOK_FETCH,payload:books};
}

export const getBookById=  async (isbn:any)=>{

   let book=await manager.getById(isbn);
   return {type: Constants.ACTION_BOOK_SELECT, payload:book};
 
}

export const addBook= async (book:any)=>{
    await manager.add(book);
    return {type: Constants.ACTION_BOOK_ADD, payload:book};
}

export const deleteBook= async (isbn:any)=>{
    await manager.remove(isbn);
    return {type: Constants.ACTION_BOOK_DELETE, payload:isbn};
}
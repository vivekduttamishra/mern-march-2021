import React,{createContext,useContext,useReducer} from 'react';
import bookReducer from './book-reducers';


export const bookContext=createContext<any>(null);


export const BookContextProvider=(props:any)=>{

    let [state,dispatch]=useReducer(bookReducer,{books:[],selectedBook:null});
    return <bookContext.Provider value={{...state,dispatch}}>{props.children}</bookContext.Provider>
}

export const useBookContext=()=>useContext(bookContext);

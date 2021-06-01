import {createStore, combineReducers,applyMiddleware} from 'redux';
import {allBooksReducer,selectedBookReducer} from './book-reducers';
import userReducer from './user-reducer';
import statusReducer from './status-reducer';
import * as Constants from './constants';
import promiseResolver from './promise-resolver-middleware';

const actionLogger= (store:any)=> (next:any) => (action:any)=>{
    //do whatever you want
    console.log('action logger got',action);

    //let next item in the chain do their job
    return next(action); //pass the action next item in the chain
}


const reducers=combineReducers({
    books: allBooksReducer,
    selectedBook: selectedBookReducer,
    user: userReducer,
    status: statusReducer
});


export default createStore(reducers,
            applyMiddleware(
                //actionLogger,
                promiseResolver));
import store from './reducers/redux-store';
import * as Constants from './reducers/constants';


store.subscribe( ()=>{

    console.log('current state ', store.getState());

});

console.log('initial state', store.getState());

store.dispatch({type: Constants.ACTION_LOGIN,payload:"vivek"});

store.dispatch({type: Constants.ACTION_BOOK_FETCH,payload:[{isb:1,title:"The Accursed God"},{isbn:2,title:"Rashmirathi"}]});

store.dispatch({type: Constants.ACTION_BOOK_ADD, payload:{isbn:3,title:'The Count of Monte Cristo'}});

store.dispatch({type: Constants.ACTION_LOGOUT});
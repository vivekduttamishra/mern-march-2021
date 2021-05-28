import * as Constants from './constants';

import {User} from '../services/user';



const userReducer= (user:User|null=null, action:any)=>{
    //console.log('userreducer received',action);
    switch(action.type){
        case Constants.ACTION_REGISTER:
        case Constants.ACTION_LOGIN:
            return action.payload;
        case Constants.ACTION_LOGOUT:
            return null;
       
    }
    return user;
};

export default userReducer;
import * as Constants from '../reducers/constants';
import {User} from './user';

interface DbUser extends User{
    password:string;
}

const users:DbUser[]=[
    {
        name:'Vivek', 
        password:'pass', 
        roles:['lead','mentor'],
        email:'vivek@conceptarchitect.in',
        token:'11223344'
    },
    {
        name:'Admin', 
        password:'pass', 
        roles:['admin','mentor'],
        email:'admin@conceptarchitect.in',
        token:'1122334455'
    }

];

const getUser= (user:DbUser)=> ({
    name:user.name,
    email:user.email,
    password:user.password,
    token:user.token,
    roles:user.roles
});


export const login=(email:string, password:string)=>{;
    console.log('login with credential',email,password);
    const user= users.find(user=> user.email===email && user.password===password);
    console.log('login user',user);    
    
    if(user)
        return {type:Constants.ACTION_LOGIN, payload:getUser(user)};
    else
        return {type:Constants.ACTION_LOGOUT};  //fire a logout on invalid credential
}

export const register=(name:string, email:string, password:string)=>{
    const user= {
        name,email,password,
        roles:[], 
        token: new Date().toLocaleTimeString() 
    };

    users.push(user);
 
    return {type:Constants.ACTION_LOGIN, payload:getUser(user)};
    
}

export const logout=()=>{
    return {type:Constants.ACTION_LOGOUT};
}


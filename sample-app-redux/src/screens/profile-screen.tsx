import React from 'react';


import {useHistory} from 'react-router-dom';
//import {useUserContext} from '../reducers/user-context';
import {useSelector} from 'react-redux';
interface Props{

}


const Component= (props:Props)=>{

   // let user= useSelector((state:{user:User|null})=>state.user);
   let user = useSelector((state:any)=>state.user);
    const history= useHistory();
    if(!user){
        
        history.push('/user/login');
        return null;
    }
     
    return(
        <div>
            <h1>Welcome {user.name}</h1>
            <h2>Email: {user.email}</h2>
            <h3>Roles</h3>
            {user.roles.map((role:string,i:number)=><p key={i}>{role}</p>)}
            
        </div>
    );

};

export default Component;
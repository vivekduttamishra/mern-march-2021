import React,{useState,useEffect} from 'react';

import {login} from '../services/user-service';
import {connect} from 'react-redux'

import {useHistory} from 'react-router-dom';
//import {useUserContext} from '../reducers/user-context';
interface Props{
    user:any;
    login:any;
}

const Component= ({user,login}:Props)=>{

    let [email,setEmail]=useState('');
    let [password,setPassword]=useState('');
  //  const {user,dispatch}=useUserContext();

    //console.log('login state',user);
    const history=useHistory();

    useEffect(()=>{       
        if(user){
            
            history.goBack();            
        }

    },[user,history]);
    
    

    const handleLogin=()=>{      
        login(email,password);   //result of login is auto dispatched
    }

    const handleQuickLogin=()=> login('vivek@conceptarchitect.in','pass');

    return(
        <div>
            <h1>Login Screen</h1>
            <input type='text' onChange={e=>setEmail(e.target.value)} placeholder='email address' />
            <input type='password' onChange={e=>setPassword(e.target.value)} placeholder='password'/>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleQuickLogin}>Quick Login</button>
        </div>
    );

};

const mapReduxStateToComponentProp=(reduxState:any)=>{
    return {
        user:reduxState.user
    };
}

const actions={
    login   //---> automatically dispatching the return of login
}

export default connect(mapReduxStateToComponentProp,actions)( Component);
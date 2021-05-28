import React from 'react';
import {Link} from 'react-router-dom';

import {logout} from '../services/user-service';

import {connect} from 'react-redux';

//import {useUserContext} from '../reducers/user-context';

import {useHistory} from 'react-router-dom';
interface Props{
    title:string;
    user:any;
    logout:any;
}

const Component= (props:Props)=>{
    
    const user=props.user;

    const links=[
        {label:'Home', path:'/', show:true},  //always
        {label:'Login', path:'/user/login',show: user===null},    //user not logged in
        {label:'Register',path:'/user/register',show:user===null}, // user not logged in       
        {label: user?.name,path:'/user/profile',show:user!==null}   //user logged in     
    ];

    const style={
        margin:5,
        color:'black',
        textDecoration: 'none'
    }
    const headerStyle={
        borderBottom: '1px solid gray'
    }
    const history=useHistory();
    const handleLogout=()=>{
        //dispatch(logout()); //dispatch({type:"ACTION_LOGOUT"})
        
        props.logout(); //logout auto dispatches. you don't need to dispatch

        history.push('/');
    }

    return(
        <div style={headerStyle}>
            <h1>{props.title}</h1>
            {
                links.map( link=> link.show?(<Link key={link.path} style={style} to={link.path}>{link.label}</Link>):null)
            }
            
            {user?(<a onClick={handleLogout}>Logout</a>):null}
        </div>
    );

};

const mapReduxStateToComponentProp= (reduxState:any)=>{

    //you get the entire redux state. you can pick whatever is needed by your component

    return {
        user:reduxState.user    //now user should become a prop on your component
    }

}

const mapActionsToProps= {
    logout     //automatically creates a prop function that will auto dispatch the result of logout
}

//use a HOC to add new props here
export default connect(mapReduxStateToComponentProp,mapActionsToProps)( Component);
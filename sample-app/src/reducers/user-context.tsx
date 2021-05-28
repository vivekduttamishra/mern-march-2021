import React,{createContext,useReducer,useContext} from 'react';
import userReducer from './user-reducer';


export const userContext= createContext<any>({});

export const UserContextProvider = (props:any)=>{

    const [user,dispatch]=useReducer(userReducer,null);

    return (
       <userContext.Provider value={{user,dispatch}}>
            {props.children}
        </userContext.Provider>
    );

};

export const useUserContext= ()=> useContext(userContext);


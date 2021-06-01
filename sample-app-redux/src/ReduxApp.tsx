import React from 'react';
import App from './App';
import store from './reducers/redux-store';
import {Provider} from 'react-redux';  //Provider is a React component similar to Context Provider


const Component = () => {

    return (
        <Provider store={store}>
            <App />
        </Provider>            
    );

}


export default Component;
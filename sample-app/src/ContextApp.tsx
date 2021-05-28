import React from 'react';
import App from './App';
import { UserContextProvider } from './reducers/user-context';
import { BookContextProvider } from './reducers/book-context';
const Component = () => {

    return (
        <BookContextProvider>
            <UserContextProvider>
                <App />
            </UserContextProvider>
        </BookContextProvider>
    );

}


export default Component;
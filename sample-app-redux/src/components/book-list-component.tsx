import React from 'react';
import {Link} from 'react-router-dom';
//import {useBookContext} from '../reducers/book-context';
//import {useUserContext} from '../reducers/user-context';
//import * as Constants from '../reducers/constants';
import {useHistory} from 'react-router-dom';
import {deleteBook} from '../reducers/book-actions';
import {useSelector,useDispatch} from 'react-redux';

interface Props{
    books:any[]
}

const Component= (props:Props)=>{

    //const {dispatch} =useBookContext();
    const dispatch=useDispatch();
    const user=useSelector((state:any)=>state.user);


    const history=useHistory();
    const navigate=(isbn:any)=>{        
        history.push(`/books/${isbn}`)
    }

    const remove=async (isbn:any)=>{ 
        if(!user)
            return alert("Only Logged In users can delete books");
        
        const action=await deleteBook(isbn);
        console.log('dispatching',action);
        dispatch(action);
        
    }
    

    return(
        <div className='list'>
            {props.books.map(book=>(
                <div key={book.isbn} className='list-item'>
                    
                    <img src={book.cover} alt={book.title}  className="image-thumbnail" />
                    <p>{book.title}</p>
                    <button onClick={()=>remove(book.isbn)} >delete</button>
                    <button onClick={()=>navigate(book.isbn)}>info</button>
                </div>
            ))}
        </div>
    );

};

export default Component;
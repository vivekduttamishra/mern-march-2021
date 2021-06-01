import React, { useEffect } from 'react';
//import { useBookContext } from '../reducers/book-context';
import { useHistory, useParams } from 'react-router-dom';
//import { useUserContext } from '../reducers/user-context';
import { getBookById } from '../reducers/book-actions';
import Loading from '../components/loading-component';
import * as Constants from '../reducers/constants';

import {useSelector,useDispatch,connect} from 'react-redux';


interface Props {
    selectedBook:any;
    user:any;
    status:any;
    setStatus:any;
    getBookById:any;
    unselectBook:any;
}

const Component = ({selectedBook,status,setStatus,user,getBookById,unselectBook}: Props) => {
    
    const params = useParams<any>();
    const history = useHistory();
    //const { selectedBook, dispatch } = useBookContext();
    //const selectedBook = useSelector((state:any)=>state.selectedBook);
    //const user =  useSelector((state:any)=>state.user);
    //const status= useSelector((state:any)=>state.status);
    //const dispatch=useDispatch();
    useEffect(() => {
        setStatus(Constants.STATUS_PENDING);
        unselectBook();
        
        if (!user)
            history.push('/user/login');

    }, [user, history]);

    useEffect(() => {       
       getBookById(params.isbn);  //internally --> dispatch(getBookById(params.isbn))
    
       //dispatch(getBookById(params.isbn));
       
    }, [params.isbn, selectedBook]);

    console.log('status',status);

    if(!status)
        return null;


    if (status.status===Constants.STATUS_PENDING) {  //search is in progress
        return <Loading />
    }
    if (status.status===Constants.STATUS_ERROR) { //book not found after search
        return <h1>No Book with isbn : {status.message} </h1>
    }

    if(!selectedBook)
        return null;
    
    return (
        <div>
            
            <h1>{selectedBook.title}</h1>

            <h2>by {selectedBook.author}</h2>
            <div className='info-area'>
                <div className='image-area'>
                    <img className='image-cover' src={selectedBook.cover} alt={selectedBook.title} />
                </div>
                <div className='description-area'>
                    {selectedBook.description}
                </div>
            </div>
        </div>
    );

};

const mapStateToProps = (state:any)=>{
    return {
        selectedBook: state.selectedBook,
        user:state.user,
        status: state.status.global
    }
}

function unselectBook(){
    return { type: Constants.ACTION_BOOK_SELECT, payload: null };
    
}
function setStatus(status:string){
    return {type: Constants.ACTION_STATUS_SET, payload:{status}}
}

//these are autodispatched
const actions={

    getBookById,
    unselectBook,
    setStatus
}

export default connect(mapStateToProps,actions)(Component);
import React,{useEffect} from 'react';
//import {useBookContext} from '../reducers/book-context';
import {getAllBooks} from '../reducers/book-actions';
import Loading from '../components/loading-component';
import BookList from '../components/book-list-component';

//new react-redux api based on hooks
import {useSelector,useDispatch,connect} from 'react-redux';

interface Props{
  //  books?:any[],
  //  getAllBooks?:any;
}



const Component= (props:Props)=>{

    //const {books,dispatch}=useBookContext();

    const books= useSelector((state:any)=>state.books);
    const dispatch= useDispatch();

    useEffect(()=>{
        // getAllBooks()        //returns a promise
        //     .then(action=>dispatch(action));
        //dispatch(getAllBooks());
        //getAllBooks();
        getAllBooks().then(action=>dispatch(action));
    },[dispatch]);


    return(
        <div>
            <h1>Book's Home</h1>
            
            {books && books.length
                ?<BookList books={books}/>
                :<Loading/>}
            

        </div>
    );

};

// const mapStateToProps = (state:any)=>{
//     return {
//         books: state.books
//     }
// };

// const actions={
//     getAllBooks
// }

//export default connect(mapStateToProps,actions)(Component);

export default Component;
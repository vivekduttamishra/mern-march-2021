import * as Constants from './constants';

const promiseResolver= (store:any)=>(next:any)=>(action:any)=>{

    if(action instanceof Promise){
        //wait for promise to be fulfilled   
        
        //let system know we are wating for an action
        store.dispatch({type:Constants.ACTION_STATUS_SET, payload:{status:Constants.STATUS_PENDING}});

        action
            .then( actualAction => {
                store.dispatch({type:Constants.ACTION_STATUS_SET, payload:{status:Constants.STATUS_DONE}})
                store.dispatch(actualAction)
            })
            .catch(error=> store.dispatch({type:Constants.ACTION_STATUS_SET, payload:{message: error.message,status:Constants.STATUS_ERROR}}));

        

    } else {

        //I handle only promises. anything else, let someone else handle it
        next(action); //pass to next middleware if I don't want to handle it
    }
    
}

export default promiseResolver;
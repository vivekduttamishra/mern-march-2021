
import * as Constants from './constants';



const statusReducer= (status:any={},action:any)=>{
  
    switch(action.type){
        case Constants.ACTION_STATUS_SET:
            if(action.action)
                return {
                    ...status,
                    [action.payload.action]:action.payload
                }
            else
                return {
                    ...status,
                    global:action.payload
                }
    }

    return status;
    
    
}


export default statusReducer;
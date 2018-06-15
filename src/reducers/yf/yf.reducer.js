
import axios from 'axios';
const INTERFACE_DATA_GET = "INTERFACE_DATA_GET"
const url = "http://192.168.51.199:8090/assert/test/test";
const initState={
   
}
export function yfReducer(state=initState,action) {
    switch(action.type) {
        case INTERFACE_DATA_GET :
            return {...state,...action.payload}
        default :
            return state
    }
}
export function getNum({user,model}) {
    let data = {user,model}
    return (dispatch,getState) => {
        let data = {user,model}
        console.log(data)
        axios.post(url, data)
            .then(function (response) {
                console.log(`response`, response.data)
                dispatch({
                    type: INTERFACE_DATA_GET,
                    payload:{
                        result: response.data
                    }
                })
            })
            .catch(function (error) {
                console.log('error----------' + error);
            });
      
      
    }
}

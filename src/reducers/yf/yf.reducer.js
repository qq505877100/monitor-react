
// import axios from 'axios';
import axiosIns from "../../utils/axios/axios";
const INTERFACE_DATA_GET = "INTERFACE_DATA_GET"
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
// export function getNum({user,model}) {
    export function getNum() {
    return (dispatch,getState) => {
        axiosIns.get("/yf/api")
            .then(function (response) {
                console.log(`yf-response`, response.data)
                dispatch({
                    type: INTERFACE_DATA_GET,
                    payload:{
                        result: response.data
                    }
                })
            })
            .catch(function (error) {
                console.log('yf-error----------' + error);
            });
    }
}

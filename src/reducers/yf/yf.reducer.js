
// import axios from 'axios';
import axiosIns from "../../utils/axios/axios";
import _x from "../../js/_x/index"
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
        //调用的时候不能加/ym/dasd前面的那个"/"
        _x.util.request.request("yf/api",{},function (response) {
            // console.log(`yf-response`, response.data)
            dispatch({
                type: INTERFACE_DATA_GET,
                payload:{
                    result: response.data
                }
            })
        },function (error) {
        })
    }
}

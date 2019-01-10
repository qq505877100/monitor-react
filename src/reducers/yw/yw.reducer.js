// import axios from 'axios';
import axiosIns from "../../utils/axios/axios";
import _x from "../../js/_x/index"

const YW_ECHART_GET_JVM = "YW_ECHART_GET_JVM"
const initState={
   
}
export function ywReducer(state=initState,action){
    switch(action.type) {
        case YW_ECHART_GET_JVM :
            return {...state,...action.payload}
        default :
            return state
    }
}

export function ywGetJvm() {
    return (dispatch) => {
        _x.util.request.request("yw/jvm",{},function (response) {
            dispatch({
                type: YW_ECHART_GET_JVM,
                payload:{
                    result: response.data
                }
            })
        },function (error) {
        })
    }
}
export function ywGetCpu() {
    return (dispatch) => {
        _x.util.request.request("yw/cpu",{},function (response) {
                dispatch({
                    type: YW_ECHART_GET_JVM,
                    payload:{
                        result: response.data
                    }
                })
        },function (error) {
        })
    }
}
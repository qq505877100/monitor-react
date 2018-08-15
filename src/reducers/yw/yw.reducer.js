// import axios from 'axios';
import axiosIns from "../../utils/axios/axios";

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
        axiosIns.get("/yw/jvm")
            .then(function (response) {
                console.log(`yf-response`, response.data)
                dispatch({
                    type: YW_ECHART_GET_JVM,
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
export function ywGetCpu() {
    return (dispatch) => {
        axiosIns.get("/yw/cpu")
            .then(function (response) {
                console.log(`yf-response`, response.data)
                dispatch({
                    type: YW_ECHART_GET_JVM,
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
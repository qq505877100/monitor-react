import axios from 'axios';
const ECHART_GET_NUM = "ECHART_GET_NUM"
const url = "http://192.168.51.199:8090/monitor/test/test";
const initState={
   
}
export function ywReducer(state=initState,action){
    switch(action.type) {
        case ECHART_GET_NUM :
            return {...state,...action.payload}
        default :
            return state
    }
}

export function ywGetNum({user,model}) {//下拉选,侧边栏
    let data = {user,model}
    return (dispatch,getState) => {
        let data = {user,model}
        console.log(data)
        axios.post(url, data)
            .then(function (response) {
                console.log(`yf-response`, response.data)
                dispatch({
                    type: ECHART_GET_NUM,
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
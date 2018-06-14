
const ADD = "ADD";
const DELETE = "DELETE";
const ASYSADD = "ASYSADD";
const init = {
    value:10
}
export function count(state={init},action) {
    switch(action.type) {
        case ADD :
            return {value:state.value + 1};
        case DELETE :
            return {value:state.value - 1};
        default :
            return init;
    }
}

export function addFunc() {
    return (dispatch,getState) => {
        console.log(getState());
        dispatch({type:ADD});
    }
}
export function delFunc() {
    return (dispatch,getState) => {
        console.log(getState());
        dispatch({type:DELETE});
    }
}
//模拟异步执行,延迟一秒执行
export function asysFunc() {
    return (dispatch,getState) => {
        console.log(getState());
        setTimeout(() => {
            dispatch({type:ADD})
        },2000);
    }
}
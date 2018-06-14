
const REGISTER_SUCCESS = "REGISTER_SUCCESS"
const ERROR_MSG = "ERROR_MSG";
const initState={
	redirectTo:'',
	isAuth:false,
	msg:'',
	user:'',
	type:''
}
export function user(state=initState,action) {
    switch(action.type) {
        case REGISTER_SUCCESS :
            return {...state,msg:'',isAuth:true,...action.payload}
        case ERROR_MSG :
            return {...state,msg:action.payload.msg,isAuth:false}
        default :
            return state
    }
}
export function update({user,pwd,repeatpwd,type}) {

    return dispatch => {
        console.log(`register1  ${user}`)
        if (!user || !pwd || !repeatpwd || !type) {
            dispatch({
                type: ERROR_MSG,
                payload:{
                    msg : "参数不对，青重新输入"
                }
            })
            return
        }
        console.log(`register2  ${user}`)
        if (pwd != repeatpwd) {
            dispatch({
                type: ERROR_MSG,
                payload:{
                    msg : "输入的两次密码不一致！"
                }
            })
            return
        }
        console.log(`register3  ${user}`)
        dispatch({
            type: REGISTER_SUCCESS,
            payload:{
                user,pwd,repeatpwd,type
            }
        })
    }
}
export function register({user,pwd,repeatpwd,type}) {
    
    return dispatch => {
        console.log(`register1  ${user}`)
        if (!user || !pwd || !repeatpwd || !type) {
            dispatch({
                type: ERROR_MSG,
                payload:{
                    msg : "参数不对，青重新输入"
                }
            })
            return
        }
        console.log(`register2  ${user}`)
        if (pwd != repeatpwd) {
            dispatch({
                type: ERROR_MSG,
                payload:{
                    msg : "输入的两次密码不一致！"
                }
            })
            return
        }
        console.log(`register3  ${user}`)
        dispatch({
            type: REGISTER_SUCCESS,
            payload:{
                user,pwd,repeatpwd,type
            }
        })
    }
    
}
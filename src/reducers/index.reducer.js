
const initState = {
    selected: 'yf',
    key: "api_monitor"
}
const CHANGE_STATE = "CHANGE_STATE"
export function index(state = initState, action) {
    switch (action.type) {
        case CHANGE_STATE:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export function changeState({ selected, key }) {
    return dispatch => {
        dispatch({
            type: CHANGE_STATE,
            payload: {
                selected, key
            }
        })
    }
}
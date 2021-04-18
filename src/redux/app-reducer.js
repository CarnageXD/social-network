import { getAuthUserData } from "./auth-reducer"


const SET_INITIALIZED = 'SET_INITIALIZED'


let initState = {
    initialized: false,
}


export const appReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_INITIALIZED: {
            return {
                ...state,
                initialized: true,
            }
        }
        default: return state
    }
}


export const setInitializedApp = () => ({ type: SET_INITIALIZED })


export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => dispatch(setInitializedApp()))
}
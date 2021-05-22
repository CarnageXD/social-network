import { AppAction, AppActionTypes, AppState } from "../types/reducersTypes/appTypes"
import { getAuthUserData } from "./auth-reducer"

let initState = {
    initialized: false,
}

export const appReducer = (state = initState, action: AppAction): AppState => {
    switch (action.type) {
        case AppActionTypes.SET_INITIALIZED: {
            return {
                ...state,
                initialized: true,
            }
        }
        default: return state
    }
}


export const setInitializedApp = () => ({ type: AppActionTypes.SET_INITIALIZED })

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => dispatch(setInitializedApp()))
}
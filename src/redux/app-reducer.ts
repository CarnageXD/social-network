import { AppActionTypes, AppState } from "../types/reducersTypes/appTypes"
import { getAuthUserData } from "./auth-reducer"
import { BaseThunkType, InferActionTypes } from "./redux-store"

let initState = {
    initialized: false,
}

type AppActions = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<AppActions, void>


export const appReducer = (state = initState, action: AppActions): AppState => {
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

export const actions = {
    setInitializedApp: () => ({ type: AppActionTypes.SET_INITIALIZED } as const)
}


export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => dispatch(actions.setInitializedApp()))
}
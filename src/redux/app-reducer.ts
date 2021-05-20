import { Dispatch } from "react"
import { getAuthUserData } from "./auth-reducer"


export enum AppActionTypes {
    SET_INITIALIZED = 'SET_INITIALIZED'
}

interface SetInitializedAction {
    type: AppActionTypes.SET_INITIALIZED,
    payload: boolean,
}

export interface AppState {
    initialized: boolean,
}

let initState = {
    initialized: false,
}

export type AppAction = SetInitializedAction

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
import { authAPI } from "../components/api/api"

export enum AuthActionTypes {
    SET_USER_DATA = 'auth/SET_USER_DATA',
    SET_AUTHORIZATION_ERROR = 'SET_AUTHORIZATION_ERROR'
}

export interface AuthState {
    id: number | null,
    email: string | null,
    login: string | null,
    isFetching: boolean | undefined,
    isAuth: boolean,
    authorizationError: boolean | null,
}

let initState = {
    id: null,
    email: null,
    login: null,
    isFetching: true,
    isAuth: false,
    authorizationError: null,
}

interface IAuthPayload {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
}

interface SetUserDataAction {
    type: AuthActionTypes.SET_USER_DATA,
    isFetching?: boolean,
    payload: IAuthPayload,

}

interface SetAuthorizationError {
    type: AuthActionTypes.SET_AUTHORIZATION_ERROR,
    payload: boolean,
}

export type AuthAction = SetUserDataAction | SetAuthorizationError

export const authReducer = (state = initState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.SET_USER_DATA: {
            return {
                ...state, isFetching: action.isFetching, ...action.payload,
            }
        }
        case AuthActionTypes.SET_AUTHORIZATION_ERROR: {
            return {
                ...state, authorizationError: true,
            }
        }
        default: return state
    }
}



export const setAuthUserData = (id: number | null, login: string | null, email: string | null, isAuth: boolean): SetUserDataAction =>
    ({ type: AuthActionTypes.SET_USER_DATA, payload: { id, login, email, isAuth } })

export const setAuthorizationError = () => ({ type: AuthActionTypes.SET_AUTHORIZATION_ERROR })


export const getAuthUserData = () => async (dispatch: any) => {
    const data = await authAPI.authMe()
    let { id, login, email } = data.data
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(id, login, email, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    const response = await authAPI.loginMe(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    }
    else dispatch(setAuthorizationError())

}

export const logout = () => async (dispatch: any) => {
    const response = await authAPI.logoutMe()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}
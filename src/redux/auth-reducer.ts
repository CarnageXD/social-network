import { Reducer } from "redux"
import { ResultCodes } from "../components/api/api"
import { authAPI } from "../components/api/auth-api"
import { securityAPI } from "../components/api/security-api"
import { AuthActionTypes, AuthState, SetUserDataAction } from "../types/reducersTypes/authTypes"
import { BaseThunkType, InferActionTypes } from "./redux-store"

let initState = {
    id: null,
    email: null,
    login: null,
    isFetching: true,
    isAuth: false,
    authorizationError: null,
    captchaUrl: null,
}

export const authReducer: Reducer<AuthState, AuthActions> = (state = initState, action) => {
    switch (action.type) {
        case AuthActionTypes.SET_USER_DATA: {
            return {
                ...state, isFetching: action.isFetching, ...action.payload,
            }
        }
        case AuthActionTypes.GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state, captchaUrl: action.captcha
            }
        }
        default: return state
    }
}

const actions = {
    setAuthUserData: (id: number | null, login: string | null, email: string | null, isAuth: boolean): SetUserDataAction => ({ type: AuthActionTypes.SET_USER_DATA, payload: { id, login, email, isAuth } } as const),
    getCaptchaUrlSuccess: (captcha: string) => ({ type: AuthActionTypes.GET_CAPTCHA_URL_SUCCESS, captcha } as const),
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const data = await authAPI.authMe()
    const { id, email, login } = data.data
    if (data.resultCode === ResultCodes.Success) {
        dispatch(actions.setAuthUserData(id, login, email, true))
    }
}

export const getCaptchaURL = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptcha()
    const captchaUrl = response.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
    async (dispatch) => {
        const response = await authAPI.loginMe(email, password, rememberMe, captcha)
        if (response.data.resultCode === ResultCodes.Success) {
            dispatch(getAuthUserData())
        }
        else if (response.data.resultCode === 10) {
            dispatch(getCaptchaURL())
        }
    }

export const logout = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logoutMe()
    if (response.data.resultCode === ResultCodes.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

type AuthActions = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<AuthActions>
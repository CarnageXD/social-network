import { authAPI, ResultCodes, securityAPI } from "../components/api/api"
import { AuthAction, AuthActionTypes, AuthState, SetUserDataAction } from "../types/reducersTypes/authTypes"


let initState = {
    id: null,
    email: null,
    login: null,
    isFetching: true,
    isAuth: false,
    authorizationError: null,
    captchaUrl: null,
}

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
        case AuthActionTypes.GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state, captchaUrl: action.captcha
            }
        }
        default: return state
    }
}



export const setAuthUserData = (id: number | null, login: string | null, email: string | null, isAuth: boolean): SetUserDataAction => ({ type: AuthActionTypes.SET_USER_DATA, payload: { id, login, email, isAuth } })
export const setAuthorizationError = () => ({ type: AuthActionTypes.SET_AUTHORIZATION_ERROR })
export const getCaptchaUrlSuccess = (captcha: string) => ({ type: AuthActionTypes.GET_CAPTCHA_URL_SUCCESS, captcha })


export const getAuthUserData = () => async (dispatch: any) => {
    const data = await authAPI.authMe()
    const { id, email, login } = data.data
    if (data.resultCode === ResultCodes.Success) {
        dispatch(setAuthUserData(id, login, email, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    const response = await authAPI.loginMe(email, password, rememberMe, captcha)
    if (response.data.resultCode = ResultCodes.Success) {
        dispatch(getAuthUserData())
    }
    else if (response.data.resultCode === 10) {
        dispatch(getCaptchaURL())
    }
    else dispatch(setAuthorizationError())

}

export const logout = () => async (dispatch: any) => {
    const response = await authAPI.logoutMe()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }

}

export const getCaptchaURL = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptcha()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}
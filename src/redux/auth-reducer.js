import { authAPI, securityAPI } from "./../components/api/api"


const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_AUTHORIZATION_ERROR = 'SET_AUTHORIZATION_ERROR'
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'


let initState = {
    id: null,
    email: null,
    login: null,
    isFetching: true,
    isAuth: false,
    authorizationError: null,
    captchaUrl: null,
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state, captchaUrl: action.captcha
            }
        }
        case SET_USER_DATA: {
            return {
                ...state, isFetching: action.isFetching, ...action.data,
            }
        }
        case SET_AUTHORIZATION_ERROR: {
            return {
                ...state, authorizationError: true,
            }
        }
        default: return state
    }
}



export const setAuthUserData = (id, login, email, isAuth) => ({ type: SET_USER_DATA, data: { id, login, email, isAuth } })
export const setAuthorizationError = () => ({ type: SET_AUTHORIZATION_ERROR })
export const getCaptchaUrlSuccess = (captcha) => ({ type: GET_CAPTCHA_URL_SUCCESS, captcha })


export const getAuthUserData = () => async (dispatch) => {
    const data = await authAPI.authMe()
    let { id, login, email } = data.data
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(id, login, email, true))
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    const response = await authAPI.loginMe(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    }
    else if (response.data.resultCode === 10) {
        dispatch(getCaptchaURL())
    }
    else dispatch(setAuthorizationError())

}

export const getCaptchaURL = () => async (dispatch) => {
    const response = await securityAPI.getCaptcha()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}


export const logout = () => async (dispatch) => {
    const response = await authAPI.logoutMe()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }

}
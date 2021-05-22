export enum AuthActionTypes {
    SET_USER_DATA = 'auth/SET_USER_DATA',
    SET_AUTHORIZATION_ERROR = 'SET_AUTHORIZATION_ERROR',
    GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'
}


export interface AuthState {
    id: number | null,
    email: string | null,
    login: string | null,
    isFetching: boolean | undefined,
    isAuth: boolean,
    authorizationError: boolean | null,
    captchaUrl: string | null,
}


interface IAuthPayload {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
}

export interface SetUserDataAction {
    type: AuthActionTypes.SET_USER_DATA,
    isFetching?: boolean,
    payload: IAuthPayload,

}

interface SetAuthorizationErrorAction {
    type: AuthActionTypes.SET_AUTHORIZATION_ERROR,
    payload: boolean,
}

interface GetCaptchaUrlSuccessAction {
    type: AuthActionTypes.GET_CAPTCHA_URL_SUCCESS,
    captcha: string,
}

export type AuthAction = SetUserDataAction | SetAuthorizationErrorAction | GetCaptchaUrlSuccessAction
import axios from 'axios'

export const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': 'f9c0a4d7-66d0-49af-b137-6e57b9216831'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export enum ResultCodes {
    Success = 0,
    Error = 1,
}

export enum CaptchaResultCodes {
    CaptchaIsRequired = 10,
}

export type APIResponseType<D = {}, RC = ResultCodes> = {
    data: D,
    messages: Array<string>,
    resultCode: RC,
}
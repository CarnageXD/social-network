import { axiosInstance, APIResponseType } from "./api"

interface AuthMeDataInterface {
    id: number,
    email: string,
    login: string,
}

export const authAPI = {
    authMe() {
        return axiosInstance.get<APIResponseType<AuthMeDataInterface>>(`auth/me`).then(response => response.data)
    },
    loginMe(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return axiosInstance.post<APIResponseType<{ userId: number }>>(`auth/login`, { email, password, rememberMe, captcha })
    },
    logoutMe() {
        return axiosInstance.delete<APIResponseType>(`auth/login`)
    }
}
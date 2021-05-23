import axios from 'axios'

const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': 'f9c0a4d7-66d0-49af-b137-6e57b9216831'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export enum ResultCodes {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10,
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    unFollowUser(userID: number) {
        return axiosInstance.delete(`follow/${userID}`).then(response => response.data)
    },
    followUser(userID: number) {
        return axiosInstance.post(`follow/${userID}`).then(response => response.data)
    },
    getProfile(userID: number) {
        console.warn('obsolete method. please use profileAPI obj :)')
        return profileAPI.getProfile(userID)
    },
}

interface GetProfileInterface {

}

interface UpdateUserJobInterface {
    resultCode: ResultCodes,
    messages: string[],
    data: {},
}

export const profileAPI = {
    getProfile(userID: number) {
        return axiosInstance.get(`profile/${userID}`).then(response => response.data)
    },
    getUserJob(userID: number) {
        return axiosInstance.get(`profile/status/${userID}`).then(response => response.data)
    },
    updateUserJob(userJob: string) {
        return axiosInstance.put<UpdateUserJobInterface>(`profile/status`, { status: userJob })
    },
    saveAvatarPhoto(avatarFile: string) {
        const formData = new FormData()
        formData.append("image", avatarFile)
        return axiosInstance.put(`profile/photo`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    }
}

interface AuthMeResponseInterface {
    data: { id: number, email: string, login: string },
    resultCode: ResultCodes,
    messages: string[],
}

interface LoginResponseInterface {
    data: { userId: number }
    resultCode: ResultCodes,
    messages: string[],
}

export const authAPI = {
    authMe() {
        return axiosInstance.get<AuthMeResponseInterface>(`auth/me`).then(response => response.data)
    },
    loginMe(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return axiosInstance.post<LoginResponseInterface>(`auth/login`, { email, password, rememberMe, captcha })
    },
    logoutMe() {
        return axiosInstance.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptcha() {
        return axiosInstance.get(`security/get-captcha-url`)
    }
}

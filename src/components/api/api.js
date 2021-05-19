import * as axios from 'axios'

const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': 'f9c0a4d7-66d0-49af-b137-6e57b9216831'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    unFollowUser(userID) {
        return axiosInstance.delete(`follow/${userID}`).then(response => response.data)
    },
    followUser(userID) {
        return axiosInstance.post(`follow/${userID}`).then(response => response.data)
    },
    getProfile(userID) {
        console.warn('obsolete method. please use profileAPI obj :)')
        return profileAPI.getProfile(userID)
    },
}

export const profileAPI = {
    getProfile(userID) {
        return axiosInstance.get(`profile/${userID}`).then(response => response.data)
    },
    getUserJob(userID) {
        return axiosInstance.get(`profile/status/${userID}`).then(response => response.data)
    },
    updateUserJob(userJob) {
        return axiosInstance.put(`profile/status`, { status: userJob })
    },
    saveAvatarPhoto(avatarFile) {
        const formData = new FormData()
        formData.append("image", avatarFile)
        return axiosInstance.put(`profile/photo`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    }
}

export const authAPI = {
    authMe() {
        return axiosInstance.get(`auth/me`).then(response => response.data)
    },
    loginMe(email, password, rememberMe = false, captcha = null) {
        return axiosInstance.post(`auth/login`, { email, password, rememberMe, captcha })
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
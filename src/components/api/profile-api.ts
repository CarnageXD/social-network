import { ProfileInterface, UserPhotosInterface } from "../../types/reducersTypes/profileTypes"
import { axiosInstance, APIResponseType } from "./api"

interface SavePhotoResponse {
    photos: UserPhotosInterface
}

export const profileAPI = {
    getProfile(userID: number) {
        return axiosInstance.get<ProfileInterface>(`profile/${userID}`).then(response => response.data)
    },
    getUserJob(userID: number) {
        return axiosInstance.get<string>(`profile/status/${userID}`).then(response => response.data)
    },
    updateUserJob(userJob: string) {
        return axiosInstance.put<APIResponseType>(`profile/status`, { status: userJob }).then(response => response.data)
    },
    saveAvatarPhoto(avatarFile: string) {
        const formData = new FormData()
        formData.append("image", avatarFile)
        return axiosInstance.put<APIResponseType<SavePhotoResponse>>(`profile/photo`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    }
}
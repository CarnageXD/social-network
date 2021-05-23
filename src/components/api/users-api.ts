import { UserInterface } from "../../types/reducersTypes/friendsTypes"
import { axiosInstance, APIResponseType } from "./api"

interface GetUsersInterface {
    items: UserInterface[],
    totalCount: number,
    error: string,
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return axiosInstance.get<GetUsersInterface>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    unFollowUser(userID: number) {
        return axiosInstance.delete<APIResponseType>(`follow/${userID}`).then(response => response.data)
    },
    followUser(userID: number) {
        return axiosInstance.post<APIResponseType>(`follow/${userID}`).then(response => response.data)
    },
}
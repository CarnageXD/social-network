import { createSelector } from "reselect"
import { AppStateType } from "./redux-store"

export const getUsersSelector = (state: AppStateType) => {
    return state.friendsPage.users
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true)
})

export const getPageSize = (state: AppStateType) => {
    return state.friendsPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.friendsPage.totalItemsCount
}

export const getCurrentPage = (state: AppStateType) => {
    return state.friendsPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
    return state.friendsPage.isFetching
}

export const getIsFollowingProgress = (state: AppStateType) => {
    return state.friendsPage.isFollowingProgress
}

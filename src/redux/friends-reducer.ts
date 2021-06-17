import { Reducer } from "redux"
import { usersAPI } from "../components/api/users-api"
import { FriendsActionTypes, FriendsState, UserInterface } from "../types/reducersTypes/friendsTypes"
import { BaseThunkType, InferActionTypes } from "./redux-store"

let initState = {
    users: [] as Array<UserInterface>,
    pageSize: 5,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: true,
    isFollowingProgress: [] as Array<number>,
}

export const friendsReducer: Reducer<FriendsState, FriendsActions> = (state = initState, action) => {
    switch (action.type) {
        case FriendsActionTypes.SET_USERS: {
            return { ...state, users: [...action.users] }
        }
        case FriendsActionTypes.SET_CURRENT_PAGE: {
            return {
                ...state, currentPage: action.currentPage
            }
        }
        case FriendsActionTypes.SET_TOTAL_USERS_COUNT: {
            return {
                ...state, totalItemsCount: action.totalCount
            }
        }
        case FriendsActionTypes.TOGGLE_IS_FRIENDS_FETCHING: {
            return {
                ...state, isFetching: action.isFetching
            }
        }
        case FriendsActionTypes.FOLLOW_USER:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.id) {
                        if (action.followed === false) return { ...user, followed: true }
                        return { ...user, followed: false }
                    }
                    return user
                })
            }
        case FriendsActionTypes.TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                isFollowingProgress: action.isFetching ?
                    [...state.isFollowingProgress, action.id]
                    : state.isFollowingProgress.filter(id => id !== action.id),
            }
        }
        default: return state
    }
}

const actions = {
    setUsers: (users: UserInterface[]) => ({ type: FriendsActionTypes.SET_USERS, users } as const),
    setCurrentPage: (currentPage: number) => ({ type: FriendsActionTypes.SET_CURRENT_PAGE, currentPage } as const),
    setTotalUsersCount: (totalCount: number) => ({ type: FriendsActionTypes.SET_TOTAL_USERS_COUNT, totalCount } as const),
    toggleIsFriendsFetching: (isFetching: boolean) =>
        ({ type: FriendsActionTypes.TOGGLE_IS_FRIENDS_FETCHING, isFetching } as const),
    toggleIsFollowingProgress: (isFetching: boolean, id: number) =>
        ({ type: FriendsActionTypes.TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, id } as const),
    onFollow: (userID: number, followed: boolean) => ({ type: FriendsActionTypes.FOLLOW_USER, followed, id: userID } as const),
}

export const requestUsers = (page: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFriendsFetching(true))
    dispatch(actions.setCurrentPage(page))
    const data = await usersAPI.getUsers(page, pageSize)
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
    dispatch(actions.toggleIsFriendsFetching(false))
}

export const unFollowUser = (userID: number, followed: boolean): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFollowingProgress(true, userID))
    const data = await usersAPI.unFollowUser(userID)
    if (data.resultCode === 0) {
        dispatch(actions.onFollow(userID, followed))
    }
    dispatch(actions.toggleIsFollowingProgress(false, userID))
}

export const followUser = (userID: number, followed: boolean): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFollowingProgress(true, userID))
    const data = await usersAPI.followUser(userID)
    if (data.resultCode === 0) {
        dispatch(actions.onFollow(userID, followed))
    }
    dispatch(actions.toggleIsFollowingProgress(false, userID))
}

type FriendsActions = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<FriendsActions>
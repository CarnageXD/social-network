import { Dispatch } from "redux"
import { usersAPI } from "../components/api/api"
import { FriendsActionTypes, FriendsState, UserInterface } from "../types/reducersTypes/friendsTypes"
import { InferActionTypes } from "./redux-store"

let initState = {
    users: [] as Array<UserInterface>,
    pageSize: 5,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: true,
    isFollowingProgress: [] as Array<number>,
}

type ActionTypes = InferActionTypes<typeof actions>

export const friendsReducer = (state = initState, action: ActionTypes): FriendsState => {
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

export const actions = {
    setUsers: (users: UserInterface[]) => ({ type: FriendsActionTypes.SET_USERS, users } as const),
    setCurrentPage: (currentPage: number) => ({ type: FriendsActionTypes.SET_CURRENT_PAGE, currentPage } as const),
    setTotalUsersCount: (totalCount: number) => ({ type: FriendsActionTypes.SET_TOTAL_USERS_COUNT, totalCount } as const),
    toggleIsFriendsFetching: (isFetching: boolean) =>
        ({ type: FriendsActionTypes.TOGGLE_IS_FRIENDS_FETCHING, isFetching } as const),
    toggleIsFollowingProgress: (isFetching: boolean, id: number) =>
        ({ type: FriendsActionTypes.TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, id } as const),
    onFollow: (userID: number, followed: boolean) => ({ type: FriendsActionTypes.FOLLOW_USER, followed, id: userID } as const),
}

export const requestUsers = (page: number, pageSize: number) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(actions.toggleIsFriendsFetching(true))
    dispatch(actions.setCurrentPage(page))
    const data = await usersAPI.getUsers(page, pageSize)
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
    dispatch(actions.toggleIsFriendsFetching(false))
}

export const unFollowUser = (userID: number, followed: boolean) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(actions.toggleIsFollowingProgress(true, userID))
    const data = await usersAPI.unFollowUser(userID)
    if (data.resultCode === 0) {
        dispatch(actions.onFollow(userID, followed))
    }
    dispatch(actions.toggleIsFollowingProgress(false, userID))
}

export const followUser = (userID: number, followed: boolean) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(actions.toggleIsFollowingProgress(true, userID))
    const data = await usersAPI.followUser(userID)
    if (data.resultCode === 0) {
        dispatch(actions.onFollow(userID, followed))
    }
    dispatch(actions.toggleIsFollowingProgress(false, userID))
}

 // props.setUsers([
        //     {
        //         id: 1, avatar: circleAvatar4, name: 'Billy Harrington',
        //         location: { country: 'USA', state: 'WA', city: 'NYC' }, status: 'offline', followed: true,
        //     },

        //     {
        //         id: 2, avatar: circleAvatar2, name: 'Steve Rambo',
        //         location: { country: 'USA', state: 'WA', city: 'NYC' }, status: 'online', followed: true,
        //     },
        //     {
        //         id: 3, avatar: circleAvatar3, name: 'Ricardo Milos',
        //         location: { country: 'Brazil', city: 'Rio da Janeiro' }, status: 'online', followed: false,
        //     },
        //     {
        //         id: 4, avatar: circleAvatar1, name: 'Brad McGuire',
        //         location: { country: 'USA', state: 'IL', city: 'Chicago' }, status: 'online', followed: true,
        //     },
        // ])
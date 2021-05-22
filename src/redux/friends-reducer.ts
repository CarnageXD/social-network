import { usersAPI } from "../components/api/api"
import { FriendsAction, FriendsActionTypes, FriendsState, UserInterface } from "../types/reducersTypes/friendsTypes"

let initState = {
    users: [] as Array<UserInterface>,
    pageSize: 5,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: true,
    isFollowingProgress: [] as Array<number>,
}

export const friendsReducer = (state = initState, action: FriendsAction): FriendsState => {
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

export const setUsers = (users: UserInterface[]) => ({ type: FriendsActionTypes.SET_USERS, users })
export const setCurrentPage = (currentPage: number) => ({ type: FriendsActionTypes.SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (totalCount: number) => ({ type: FriendsActionTypes.SET_TOTAL_USERS_COUNT, totalCount })
export const toggleIsFriendsFetching = (isFetching: boolean) =>
    ({ type: FriendsActionTypes.TOGGLE_IS_FRIENDS_FETCHING, isFetching })
export const toggleIsFollowingProgress = (isFetching: boolean, id: number) =>
    ({ type: FriendsActionTypes.TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, id })
export const onFollow = (userID: number, followed: boolean) => ({ type: FriendsActionTypes.FOLLOW_USER, followed, id: userID })




export const requestUsers = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFriendsFetching(true))
    dispatch(setCurrentPage(page))
    const data = await usersAPI.getUsers(page, pageSize)
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
    dispatch(toggleIsFriendsFetching(false))
}

export const unFollowUser = (userID: number, followed: boolean) => async (dispatch: any) => {
    dispatch(toggleIsFollowingProgress(true, userID))
    const data = await usersAPI.unFollowUser(userID)
    if (data.resultCode === 0) {
        dispatch(onFollow(userID, followed))
    }
    dispatch(toggleIsFollowingProgress(false, userID))
}

export const followUser = (userID: number, followed: boolean) => async (dispatch: any) => {
    dispatch(toggleIsFollowingProgress(true, userID))
    const data = await usersAPI.followUser(userID)
    if (data.resultCode === 0) {
        dispatch(onFollow(userID, followed))
    }
    dispatch(toggleIsFollowingProgress(false, userID))
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
import { usersAPI } from "./../components/api/api"

const SHOW_MORE = 'SHOW_MORE'
const FOLLOW_USER = 'FOLLOW_USER'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FRIENDS_FETCHING = 'TOGGLE_IS_FRIENDS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

let initState = {
    users: [
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
    ],
    pageSize: 5,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: true,
    isFollowingProgress: [],
}

export const friendsReducer = (state = initState, action) => {
    switch (action.type) {
        // case SHOW_MORE:
        //     return {
        //         ...state,
        //         users: [
        //             ...state.messagesData, {
        //                 message: state.newMessage.message,
        //                 avatar: state.newMessage.avatar,
        //                 messageTime: state.newMessage.messageTime,
        //             }
        //         ],
        //         newMessage: {
        //             message: '',
        //         }
        //     }
        case SET_USERS: {
            return { ...state, users: [...action.users] }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state, currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state, totalItemsCount: action.totalCount
            }
        }
        case TOGGLE_IS_FRIENDS_FETCHING: {
            return {
                ...state, isFetching: action.isFetching
            }
        }
        case FOLLOW_USER:
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
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
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

export const showMore = () => ({ type: SHOW_MORE })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (totalCount) => ({ type: SET_TOTAL_USERS_COUNT, totalCount })
export const toggleIsFriendsFetching = (isFetching) => ({ type: TOGGLE_IS_FRIENDS_FETCHING, isFetching })
export const toggleIsFollowingProgress = (isFetching, id) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, id })
export const onFollow = (userID, followed) => ({ type: FOLLOW_USER, followed, id: userID })




export const requestUsers = (page, pageSize) => async (dispatch) => {
    dispatch(toggleIsFriendsFetching(true))
    dispatch(setCurrentPage(page))
    const data = await usersAPI.getUsers(page, pageSize)
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
    dispatch(toggleIsFriendsFetching(false))
}

export const unFollowUser = (userID, followed) => async (dispatch) => {
    dispatch(toggleIsFollowingProgress(true, userID))
    const data = await usersAPI.unFollowUser(userID)
    if (data.resultCode === 0) {
        dispatch(onFollow(userID, followed))
    }
    dispatch(toggleIsFollowingProgress(false, userID))
}

export const followUser = (userID, followed) => async (dispatch) => {
    dispatch(toggleIsFollowingProgress(true, userID))
    const data = await usersAPI.followUser(userID)
    if (data.resultCode === 0) {
        dispatch(onFollow(userID, followed))
    }
    dispatch(toggleIsFollowingProgress(false, userID))
}
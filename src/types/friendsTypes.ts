import { UserPhotosInterface } from "../types/profileTypes"

export enum FriendsActionTypes {
    FOLLOW_USER = 'FOLLOW_USER',
    SET_USERS = 'SET_USERS',
    SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
    SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT',
    TOGGLE_IS_FRIENDS_FETCHING = 'TOGGLE_IS_FRIENDS_FETCHING',
    TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS',
}

export interface FriendsState {
    users: Array<UserInterface>
    pageSize: number,
    totalItemsCount: number,
    currentPage: number,
    isFetching: boolean,
    isFollowingProgress: Array<number>
}

export interface UserInterface {
    id: number,
    name: string,
    status: string,
    photos: UserPhotosInterface,
    followed: boolean,
}

interface SetUsersAction {
    type: FriendsActionTypes.SET_USERS,
    users: UserInterface[]
}

interface SetCurrentPageAction {
    type: FriendsActionTypes.SET_CURRENT_PAGE,
    currentPage: number,
}

interface SetTotalUsersCountAction {
    type: FriendsActionTypes.SET_TOTAL_USERS_COUNT,
    totalCount: number,
}

interface ToggleIsFriendsFetchingAction {
    type: FriendsActionTypes.TOGGLE_IS_FRIENDS_FETCHING,
    isFetching: boolean,
}

interface FollowUserAction {
    type: FriendsActionTypes.FOLLOW_USER,
    id: number,
    followed: boolean,
}

interface ToggleIsFollowingProgressAction {
    type: FriendsActionTypes.TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean,
    id: number,
}

export type FriendsAction = SetUsersAction | SetCurrentPageAction | SetTotalUsersCountAction | ToggleIsFollowingProgressAction | FollowUserAction | ToggleIsFriendsFetchingAction
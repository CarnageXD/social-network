import { UserPhotosInterface } from "./profileTypes"

export enum FriendsActionTypes {
    FOLLOW_USER = 'FOLLOW_USER',
    SET_USERS = 'SET_USERS',
    SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
    SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT',
    TOGGLE_IS_FRIENDS_FETCHING = 'TOGGLE_IS_FRIENDS_FETCHING',
    TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS',
    SET_FILTER = 'SET_FILTER',
}

export interface FriendsState {
    users: Array<UserInterface>
    pageSize: number,
    totalItemsCount: number,
    currentPage: number,
    isFetching: boolean,
    isFollowingProgress: Array<number>,
    filter: boolean | null,
}

export interface UserInterface {
    id: number,
    name: string,
    status?: string,
    photos: UserPhotosInterface,
    followed: boolean,
}
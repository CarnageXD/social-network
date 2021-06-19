import { Reducer } from "redux"
import { ResultCodes } from "../components/api/api"
import { profileAPI } from "../components/api/profile-api"
import { ProfileActionTypes, ProfileInterface, ProfileState, UserPhotosInterface } from "../types/reducersTypes/profileTypes"
import { BaseThunkType, InferActionTypes } from "./redux-store"

let initState = {
    profile: null,
    posts: [
        { id: 5, message: 'hello' },
        { id: 4, message: 'Niko niko' },
        { id: 3, message: 'In three weeks,  i’m going to visit Iceland, it’ll be awesome!' },
        { id: 2, message: 'A minute ago met angry dude in locker, had to destroy his underpants' },
        { id: 1, message: 'Hello, ima new in dungeon!' },
    ],
    newPostText: '',
    userJob: '',
    photos: null,
}

export const profileReducer: Reducer<ProfileState, ProfileActions> = (state = initState, action) => {
    switch (action.type) {
        case ProfileActionTypes.ADD_POST:
            return {
                ...state,
                newPostText: '',
                posts: [{ id: 6, message: state.newPostText }, ...state.posts,]
            }
        case ProfileActionTypes.UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        case ProfileActionTypes.SET_USER_PROFILE:
            debugger
            return {
                ...state,
                profile: action.profile,
            }
        case ProfileActionTypes.SET_USER_JOB:
            return {
                ...state,
                userJob: action.userJob,
            }
        case ProfileActionTypes.DELETE_POST:
            return {
                ...state, posts: state.posts.filter(p => p.id !== action.postId)
            }

        case ProfileActionTypes.SAVE_AVATAR:
            return {
                ...state,
                photos: action.photos,
            }
        default: return state
    }
}


export const actions = {
    addPost: () => ({ type: ProfileActionTypes.ADD_POST } as const),
    updateNewPostText: (text: string) => ({ type: ProfileActionTypes.UPDATE_NEW_POST_TEXT, newText: text } as const),
    setUserProfile: (profile: ProfileInterface) => ({ type: ProfileActionTypes.SET_USER_PROFILE, profile } as const),
    setUserJob: (userJob: string) => ({ type: ProfileActionTypes.SET_USER_JOB, userJob } as const),
    deletePost: (postId: number) => ({ type: ProfileActionTypes.DELETE_POST, postId } as const),
    setUserAvatar: (photos: UserPhotosInterface) => ({ type: ProfileActionTypes.SAVE_AVATAR, photos } as const),
}



export const getUserProfile = (userID: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userID)
    dispatch(actions.setUserProfile(data))
}

export const getUserJob = (userID: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getUserJob(userID)
    dispatch(actions.setUserJob(data))
}

export const updateUserJob = (userJob: string): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateUserJob(userJob)
        if (data.resultCode === ResultCodes.Success) {
            dispatch(actions.setUserJob(userJob))
        }
    }
    catch {

    }
}

export const saveAvatar = (avatarFile: File): ThunkType => async (dispatch) => {
    const response = await profileAPI.saveAvatarPhoto(avatarFile)
    if (response.data.resultCode === 0) {
        dispatch(actions.setUserAvatar(response.data.data.photos))
    }
}

type ProfileActions = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ProfileActions>
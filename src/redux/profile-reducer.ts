import { profileAPI, ResultCodes, usersAPI } from "../components/api/api"
import { ProfileAction, ProfileActionTypes, ProfileInterface, ProfileState } from "../types/reducersTypes/profileTypes"

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

export const profileReducer = (state = initState, action: ProfileAction): ProfileState => {
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



export const addPostActionCreator = () => ({ type: ProfileActionTypes.ADD_POST })
export const updateNewPostTextActionCreator = (text: string) => ({ type: ProfileActionTypes.UPDATE_NEW_POST_TEXT, newText: text })
export const setUserProfile = (profile: ProfileInterface) => ({ type: ProfileActionTypes.SET_USER_PROFILE, profile })
export const setUserJob = (userJob: string) => ({ type: ProfileActionTypes.SET_USER_JOB, userJob })
export const deletePost = (postId: number) => ({ type: ProfileActionTypes.DELETE_POST, postId })
export const setUserAvatar = (photos: string) => ({ type: ProfileActionTypes.SAVE_AVATAR, photos })





export const getUserProfile = (userID: number) => async (dispatch: any) => {
    const data = await usersAPI.getProfile(userID)
    dispatch(setUserProfile(data))
}

export const getUserJob = (userID: number) => async (dispatch: any) => {
    const data = await profileAPI.getUserJob(userID)
    dispatch(setUserJob(data))
}

export const updateUserJob = (userJob: string) => async (dispatch: any) => {
    try {
        const data = await profileAPI.updateUserJob(userJob)
        if (data.data.resultCode === ResultCodes.Success) {
            dispatch(setUserJob(userJob))
        }
    }
    catch {

    }
}

export const saveAvatar = (avatarFile: string) => async (dispatch: any) => {
    const response = await profileAPI.saveAvatarPhoto(avatarFile)
    if (response.data.resultCode === 0) {
        dispatch(setUserAvatar(response.data.data.photos))
    }
}
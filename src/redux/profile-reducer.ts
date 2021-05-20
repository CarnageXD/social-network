import { profileAPI, usersAPI } from "../components/api/api"


export enum ProfileActionTypes {
    ADD_POST = 'ADD_POST',
    UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT',
    SET_USER_PROFILE = 'SET_USER_PROFILE',
    SET_USER_JOB = 'SET_USER_JOB',
    DELETE_POST = 'DELETE_POST',
}

export interface ProfileState {
    profile: ProfileInterface | null,
    posts: PostsInterface[]
    newPostText: string,
    userJob: string,
}

interface PostsInterface {
    id: number,
    message: string
}

interface ProfileInterface {
    userId: number,
    lookingForAJob?: boolean | undefined,
    lookingForAJobDescription?: string | undefined,
    fullName: string,
    contacts?: ContactsInterface | undefined,
    photos?: ProfilePhotosInterface | null,
}

interface ContactsInterface {
    github?: string | undefined,
    vk?: string | undefined,
    facebook?: string | undefined,
    instagram?: string | undefined,
    twitter?: string | undefined,
    website?: string | undefined,
    youtube?: string | undefined,
    mainLink?: string,
}

interface ProfilePhotosInterface {
    small: string | null,
    large: string | null,
}

interface AddPostAction {
    type: ProfileActionTypes.ADD_POST,
}

interface UpdatePostTextAction {
    type: ProfileActionTypes.UPDATE_NEW_POST_TEXT,
    newText: string,

}

interface SetUserProfileAction {
    type: ProfileActionTypes.SET_USER_PROFILE,
    profile: ProfileInterface,

}

interface SetUserJobAction {
    type: ProfileActionTypes.SET_USER_JOB,
    userJob: string,

}

interface DeletePostAction {
    type: ProfileActionTypes.DELETE_POST,
    postId: number,

}

type ProfileAction = AddPostAction | UpdatePostTextAction | SetUserProfileAction | SetUserJobAction | DeletePostAction

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

        default: return state
    }
}

export const addPostActionCreator = () => ({ type: ProfileActionTypes.ADD_POST })
export const updateNewPostTextActionCreator = (text: string) => ({ type: ProfileActionTypes.UPDATE_NEW_POST_TEXT, newText: text })
export const setUserProfile = (profile: ProfileInterface) => ({ type: ProfileActionTypes.SET_USER_PROFILE, profile })
export const setUserJob = (userJob: string) => ({ type: ProfileActionTypes.SET_USER_JOB, userJob })
export const deletePost = (postId: number) => ({ type: ProfileActionTypes.DELETE_POST, postId })




export const getUserProfile = (userID: number) => async (dispatch: any) => {
    const data = await usersAPI.getProfile(userID)
    dispatch(setUserProfile(data))
}

export const getUserJob = (userID: number) => async (dispatch: any) => {
    const data = await profileAPI.getUserJob(userID)
    dispatch(setUserJob(data))
}

export const updateUserJob = (userJob: string) => async (dispatch: any) => {
    const data = await profileAPI.updateUserJob(userJob)
    if (data.resultCode === 0) {
        dispatch(setUserJob(userJob))
    }
}

import { profileAPI, usersAPI } from "./../components/api/api"

const ADD_POST = 'ADD_POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_USER_JOB = 'SET_USER_JOB'
const DELETE_POST = 'DELETE_POST'


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

export const profileReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                newPostText: '',
                posts: [{ id: 6, message: state.newPostText }, ...state.posts,]
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
            }
        case SET_USER_JOB:
            return {
                ...state,
                userJob: action.userJob,
            }
        case DELETE_POST:
            return {
                ...state, posts: state.posts.filter(p => p.id !== action.postId)
            }

        default: return state
    }
}

export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setUserJob = (userJob) => ({ type: SET_USER_JOB, userJob })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })




export const getUserProfile = (userID) => async (dispatch) => {
    const data = await usersAPI.getProfile(userID)
    dispatch(setUserProfile(data))
}

export const getUserJob = (userID) => async (dispatch) => {
    const data = await profileAPI.getUserJob(userID)
    dispatch(setUserJob(data))
}

export const updateUserJob = (userJob) => async (dispatch) => {
    const data = await profileAPI.updateUserJob(userJob)
    if (data.resultCode === 0) {
        debugger
        dispatch(setUserJob(userJob))
    }
}

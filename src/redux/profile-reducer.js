import { profileAPI, usersAPI } from "./../components/api/api"

const ADD_POST = 'ADD_POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_USER_JOB = 'SET_USER_JOB'


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

        default: return state
    }
}

export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setUserJob = (userJob) => ({ type: SET_USER_JOB, userJob })



export const getUserProfile = (userID) => (dispatch) => {
    usersAPI.getProfile(userID)
        .then(data => { dispatch(setUserProfile(data)) })
}

export const getUserJob = (userID) => (dispatch) => {
    profileAPI.getUserJob(userID)
        .then(data => { dispatch(setUserJob(data)) })
}

export const updateUserJob = (userJob) => (dispatch) => {
    profileAPI.updateUserJob(userJob)
        .then(data => {
            if (data.resultCode === 0) {
                debugger
                dispatch(setUserJob(userJob))
            }
        })
}

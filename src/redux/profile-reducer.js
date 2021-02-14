const ADD_POST = 'ADD_POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT'

let initState = {
    posts: [
        { id: 5, message: 'so fucking deep' },
        { id: 4, message: 'Niko niko' },
        { id: 3, message: 'In three weeks,  i’m going to visit Iceland, it’ll be awesome!' },
        { id: 2, message: 'A minute ago met angry dude in locker, had to destroy his underpants' },
        { id: 1, message: 'Hello, ima new in dungeon!' },
    ],
    newPostText: '',
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

        default: return state
    }
}

export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text })
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { profileReducer } from './profile-reducer'
import { dialogsReducer } from './dialogs-reducer'
import { sidebarReducer } from './sidebar-reducer'
import { friendsReducer } from './friends-reducer'
import { authReducer } from './auth-reducer'
import { appReducer } from './app-reducer'
import thunkMiddleware from 'redux-thunk'

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsPage: friendsReducer,
    frequentFriends: sidebarReducer,
    auth: authReducer,
    initApp: appReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store
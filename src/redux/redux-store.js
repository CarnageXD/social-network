import { combineReducers, createStore } from 'redux'
import { profileReducer } from './profile-reducer'
import { dialogsReducer } from './dialogs-reducer'
import { sidebarReducer } from './sidebar-reducer'
import { friendsReducer } from './friends-reducer'

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsPage: friendsReducer,
    frequentFriends: sidebarReducer,
})

let store = createStore(reducers)

window.store = store

export default store
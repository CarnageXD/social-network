import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
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

export type AppStateType = ReturnType<typeof reducers>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

// window.store = store

export default store
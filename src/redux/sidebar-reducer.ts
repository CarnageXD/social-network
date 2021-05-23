import circleAvatar1 from './../img/brad.png'
import circleAvatar3 from './../img/ricardo.jpg'
import circleAvatar4 from './../img/billy.jpg'
import { InferActionTypes } from './redux-store'

let initState = {
    friendsImages: [
        { avatar: circleAvatar4, name: 'Billy' },
        { avatar: circleAvatar1, name: 'Brad' },
        { avatar: circleAvatar3, name: 'Ricardo' },
    ]
}

type SideBarActions = InferActionTypes<typeof actions>

const actions = {

}

export const sidebarReducer = (state = initState, action: SideBarActions) => {
    return state;
}
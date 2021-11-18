import circleAvatar from './../img/van-avatar.jpeg'
import circleAvatar1 from './../img/gridPhoto1.png'
import circleAvatar2 from './../img/gridPhoto2.png'
import circleAvatar3 from './../img/gridPhoto3.png'
import circleAvatar4 from './../img/gridPhoto4.jpg'
import { DialogsActionTypes, DialogsState } from '../types/reducersTypes/dialogsTypes'
import { InferActionTypes } from './redux-store'
import { Reducer } from 'redux'

let initState = {
    chatData: [
        { id: 1, avatar: circleAvatar1, name: 'Brad', lastMessage: 'Hello every one guys' },
        { id: 1, avatar: circleAvatar1, name: 'Brad', lastMessage: 'Hello every one guys' },
        { id: 1, avatar: circleAvatar1, name: 'Brad', lastMessage: 'Hello every one guys' },
        { id: 2, avatar: circleAvatar2, name: 'Steve', lastMessage: 'How are you doing?' },
        { id: 3, avatar: circleAvatar3, name: 'Ricardo', lastMessage: 'Lets dance and have fun' },
        { id: 4, avatar: circleAvatar4, name: 'Billy', lastMessage: 'So, when you are going to gym?' },
        { id: 5, avatar: circleAvatar, name: 'Saved messages', lastMessage: 'Secret info' }
    ],
    messagesData: [
        { id: 1, message: 'Hello, Billy', avatar: circleAvatar, messageTime: "11:44PM" },
        { id: 2, message: 'Hello, Van', avatar: circleAvatar4, messageTime: "11:46PM" },
        { id: 3, message: 'Do you like what u see?', avatar: circleAvatar, messageTime: "00:00AM" },
        { id: 4, message: 'mmmm', avatar: circleAvatar4, messageTime: "00:00AM" },
    ],
    newMessage: { id: 5, message: '', avatar: circleAvatar, messageTime: "09:44AM" }
}

export const actions = {
    addMessage: (newMessageBody: string) => ({ type: DialogsActionTypes.ADD_MESSAGE, newMessageBody })
}

export const dialogsReducer: Reducer<DialogsState, DialogsActions> = (state = initState, action) => {
    switch (action.type) {
        case DialogsActionTypes.ADD_MESSAGE:
            let body = action.newMessageBody
            return {
                ...state,
                messagesData: [
                    ...state.messagesData, {
                        id: state.newMessage.id,
                        message: body,
                        avatar: state.newMessage.avatar,
                        messageTime: state.newMessage.messageTime,
                    },
                ],
            }
        default: return state
    }
}


type DialogsActions = InferActionTypes<typeof actions>
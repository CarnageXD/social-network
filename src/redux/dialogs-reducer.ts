import circleAvatar from './../img/van-avatar.jpeg'
import circleAvatar1 from './../img/brad.png'
import circleAvatar2 from './../img/steve.jpg'
import circleAvatar3 from './../img/ricardo.jpg'
import circleAvatar4 from './../img/billy.jpg'
import { DialogsActionTypes, DialogsState } from '../types/reducersTypes/dialogsTypes'
import { InferActionTypes } from './redux-store'

let initState = {
    chatData: [
        { id: 1, avatar: circleAvatar1, name: 'Brad', lastMessage: 'See you in deep dark fantasies' },
        { id: 1, avatar: circleAvatar1, name: 'Brad', lastMessage: 'See you in deep dark fantasies' },
        { id: 1, avatar: circleAvatar1, name: 'Brad', lastMessage: 'See you in deep dark fantasies' },
        { id: 2, avatar: circleAvatar2, name: 'Steve', lastMessage: 'Hello dude' },
        { id: 3, avatar: circleAvatar3, name: 'Ricardo', lastMessage: 'Last night was awesome' },
        { id: 4, avatar: circleAvatar4, name: 'Billy', lastMessage: 'So, when (van) you are going to gym?' },
        { id: 5, avatar: circleAvatar, name: 'Van', lastMessage: 'Saved messages' }
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
    addMessageActionCreator: (newMessageBody: string) => ({ type: DialogsActionTypes.ADD_MESSAGE, newMessageBody })
}

export const dialogsReducer = (state = initState, action: DialogsActions): DialogsState => {
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
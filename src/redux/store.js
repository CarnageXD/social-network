import circleAvatar from './../img/van-post.jpg'
import circleAvatar1 from './../img/brad.png'
import circleAvatar2 from './../img/steve.jpg'
import circleAvatar3 from './../img/ricardo.jpg'
import circleAvatar4 from './../img/billy.jpg'
import { profileReducer } from './profile-reducer'
import { dialogsReducer } from './dialogs-reducer'
import { sidebarReducer } from './sidebar-reducer'

const store = {
    _state: {
        profilePage: {
            posts: [
                { id: 5, message: 'so fucking deep' },
                { id: 4, message: 'Niko niko' },
                { id: 3, message: 'In three weeks,  i’m going to visit Iceland, it’ll be awesome!' },
                { id: 2, message: 'A minute ago met angry dude in locker, had to destroy his underpants' },
                { id: 1, message: 'Hello, ima new in dungeon!' },
            ],
            newPostText: '',
        },
        dialogsPage: {
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
        },
        frequentFriends: {
            friendsImages: [
                { avatar: circleAvatar4, name: 'Billy' },
                { avatar: circleAvatar1, name: 'Brad' },
                { avatar: circleAvatar3, name: 'Ricardo' },
            ]
        }
    },
    _callSubscriber() {

    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.frequentFriends = sidebarReducer(this._state.frequentFriends, action)
        this._callSubscriber(this._state)
    },
}

window.store = store;
export default store
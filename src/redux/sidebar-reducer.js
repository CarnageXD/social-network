import circleAvatar from './../img/van-post.jpg'
import circleAvatar1 from './../img/brad.png'
import circleAvatar2 from './../img/steve.jpg'
import circleAvatar3 from './../img/ricardo.jpg'
import circleAvatar4 from './../img/billy.jpg'

let initState = {
    friendsImages: [
        { avatar: circleAvatar4, name: 'Billy' },
        { avatar: circleAvatar1, name: 'Brad' },
        { avatar: circleAvatar3, name: 'Ricardo' },
    ]
}

export const sidebarReducer = (state = initState, action) => {
    return state;
}
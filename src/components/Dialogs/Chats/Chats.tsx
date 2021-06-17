import s from './Chats.module.css'
import { NavLink } from 'react-router-dom'
import { FC } from 'react'

interface ChatsPropsInterface {
    id: number,
    avatar: string,
    name: string,
    lastMessage: string,
}

const Chats: FC<ChatsPropsInterface> = (props) => {
    return (
        <NavLink to={`/dialogs/${props.id}`}>
            <div className={s.chat}>
                <div className={s.chatPhoto}>
                    <img src={props.avatar} className={s.circleAvatar} alt='usersAvatar'></img>
                </div>
                <div className={s.getMessage}>
                    <div className={s.messageFrom}>{props.name}</div>
                    <div className={s.lastMessage}>{props.lastMessage}</div>
                </div>
            </div>
        </NavLink>
    )
}


export default Chats
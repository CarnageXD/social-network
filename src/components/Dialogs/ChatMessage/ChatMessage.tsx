import { FC } from 'react'
import { ChatMessageInterface } from '../Dialogs'
import s from './ChatMessage.module.css'



const ChatMessage: FC<ChatMessageInterface> = (props) => {
    return (
        <div className={s.chatMessages}>
            <div className={s.senderInfo}>
                <div>
                    <img alt='chatAvatar' src={props.photo} className={s.circleAvatar}></img>
                </div>
                <div className={s.message}>{props.message}</div>
            </div>
            {/* <div className={s.messageTime}>{props.messageTime}</div> */}
        </div>
    )
}


export default ChatMessage
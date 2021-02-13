import s from './ChatMessage.module.css'

const ChatMessage = (props) => {
    return (
        <div className={s.chatMessages}>
            <div className={s.senderInfo}>
                <div>
                    <img alt='chatAvatar' src={props.avatar} className={s.circleAvatar}></img>
                </div>
                <div className={s.message}>{props.message}</div>
            </div>
            <div className={s.messageTime}>{props.messageTime}</div>
        </div>
    )
}


export default ChatMessage
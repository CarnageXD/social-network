import Chats from './Chats/Chats'
import s from './Dialogs.module.css'
import ChatMessage from './ChatMessage/ChatMessage'
import React from "react"

let textChat = React.createRef()

const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        let text = textChat.current.value
        alert(text)
    }
}

const Dialogs = (props) => {
    let chatElements =
        props.state.chatData.map(chat => <Chats id={chat.id} avatar={chat.avatar} name={chat.name} lastMessage={chat.lastMessage} />)
    let messagesElements =
        props.state.messagesData.map(message => <ChatMessage message={message.message} avatar={message.avatar} messageTime={message.messageTime} />)
    return (
        <div className={s.dialogWrapper}>
            <div className={s.selectChat}>
                {chatElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div className={s.chatBlock}>
                    <input ref={textChat} onKeyPress={handleKeyPress} placeholder='Enter a text to send...' className={s.chatInput} type='text'></input>
                </div>
            </div>
            {/* <div className={s.emptyChatMessage}>Select a chat to start messaging...</div> */}
        </div >
    )
}


export default Dialogs
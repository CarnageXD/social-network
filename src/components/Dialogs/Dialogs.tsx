import Chats from './Chats/Chats'
import s from './Dialogs.module.css'
import ChatMessage from './ChatMessage/ChatMessage'
import React, { useState, FC } from "react"
import { DialogsState } from '../../types/reducersTypes/dialogsTypes'

interface DialogsPropsInterface {
    addMessage: (text: string) => void,
    dialogsPage: DialogsState
}

const Dialogs: FC<DialogsPropsInterface> = (props) => {
    const [text, setText] = useState(props.dialogsPage.newMessage.message)

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addMessage(text)
            setText('')
        }
    }

    const updateMessageText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    let chatElements =
        props.dialogsPage.chatData.map(chat => <Chats id={chat.id} avatar={chat.avatar} name={chat.name} lastMessage={chat.lastMessage} />)
    let messagesElements =
        props.dialogsPage.messagesData.map(message => <ChatMessage message={message.message} avatar={message.avatar} messageTime={message.messageTime} />)


    return (
        <div className={s.dialogWrapper}>
            <div className={s.selectChat}>
                {chatElements}
            </div>
            <div className={s.messages}>
                <div className={s.messagesContainer}>
                    {messagesElements}
                    <div className={s.chatBlock}>
                        <input onChange={updateMessageText} onKeyPress={handleKeyPress} placeholder='Enter a text to send...' className={s.chatInput} type='text' value={text}></input>
                    </div>
                </div>
            </div>
            {/* <div className={s.emptyChatMessage}>Select a chat to start messaging...</div> */}
        </div >
    )
}


export default Dialogs
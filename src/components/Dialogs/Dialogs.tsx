import Chats from './Chats/Chats'
import s from './Dialogs.module.css'
import ChatMessage from './ChatMessage/ChatMessage'
import React, { useState, FC } from "react"
import { useSelector } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { useEffect } from 'react'

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

interface DialogsPropsInterface {

}

export interface ChatMessageInterface {
    photo: string,
    message: string,
}

const Dialogs: FC<DialogsPropsInterface> = (props) => {
    const dialogsPage = useSelector((state: AppStateType) => state.dialogsPage)
    const [text, setText] = useState(dialogsPage.newMessage.message)
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    const [messages, setMessages] = useState<ChatMessageInterface[]>([])

    useEffect(() => {
        ws.addEventListener('message', (e: MessageEvent) => {
            setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
        })
        return (() => {
            debugger
            ws.removeEventListener('message', (e: MessageEvent) => {
                setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
            })
        })
    }, [])

    useEffect(() => {
        ws.addEventListener('open', () => {
            setReadyStatus('ready')
        })
    }, [readyStatus])

    ws.addEventListener('close', () => {
        console.log('closed')
        setReadyStatus('pending')
    })

    const addMessage = (text: string) => {
        ws.send(text)
    }
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addMessage(text)
            setText('')
        }
    }

    const updateMessageText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    let chatElements =
        dialogsPage.chatData.map(chat => <Chats id={chat.id} avatar={chat.avatar} name={chat.name} lastMessage={chat.lastMessage} />)
    let messagesElements =
        messages.map((message, index) => <ChatMessage message={message.message} photo={message.photo} key={index} />)


    return (
        <div className={s.dialogWrapper}>
            <div className={s.selectChat}>
                {chatElements}
            </div>
            <div className={s.messages}>
                <div className={s.messagesContainer}>
                    <div style={{ overflow: 'auto' }}>{messagesElements}</div>
                    <div className={s.chatBlock}>
                        <input disabled={readyStatus !== 'ready'} onChange={updateMessageText} onKeyPress={handleKeyPress} placeholder='Enter a text to send...' className={s.chatInput} type='text' value={text}></input>
                    </div>
                </div>
            </div>
            {/* <div className={s.emptyChatMessage}>Select a chat to start messaging...</div> */}
        </div >
    )
}


export default Dialogs
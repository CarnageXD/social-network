import React from "react"
import { addMessageActionCreator, updateMessageTextActionCreator } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'


const DialogsContainer = (props) => {
    let state = props.store.getState().dialogsPage
    const handleKeyPress = () => {
        props.store.dispatch(addMessageActionCreator())
    }

    const updateMessageText = (text) => {
        let action = updateMessageTextActionCreator(text)
        props.store.dispatch(action)
    }

    return (<Dialogs handleKeyPress={handleKeyPress} updateMessageText={updateMessageText} dialogsPage={state} />)
}


export default DialogsContainer
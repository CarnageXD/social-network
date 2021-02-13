import { connect } from "react-redux"
import { addMessageActionCreator, updateMessageTextActionCreator } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'


const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleKeyPress: () => { dispatch(addMessageActionCreator()) },
        updateMessageText: (text) => {
            let action = updateMessageTextActionCreator(text)
            dispatch(action)
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer
import { connect } from "react-redux"
import { compose } from "redux"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { addMessageActionCreator, updateMessageTextActionCreator } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'


const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
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

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs)
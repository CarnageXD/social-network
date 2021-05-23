import { connect } from "react-redux"
import { compose } from "redux"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { actions } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'


const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleKeyPress: (text) => { dispatch(actions.addMessageActionCreator(text)) },
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs)
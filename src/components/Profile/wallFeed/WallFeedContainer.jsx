import { connect } from "react-redux"
import { actions } from '../../../redux/profile-reducer'
import WallFeed from './wallFeed'


const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddPost: () => { dispatch(actions.addPostActionCreator()) },
        onPostChange: (text) => {
            let action = actions.updateNewPostTextActionCreator(text)
            dispatch(action)
        }

    }
}

const WallFeedContainer = connect(mapStateToProps, mapDispatchToProps)(WallFeed)

export default WallFeedContainer
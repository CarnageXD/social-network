import { connect } from "react-redux"
import { actions } from '../../../redux/profile-reducer'
import { AppStateType } from "../../../redux/redux-store"
import WallFeed from './wallFeed'


const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const WallFeedContainer = connect(mapStateToProps, { onAddPost: actions.addPost, onPostChange: actions.updateNewPostText })(WallFeed)

export default WallFeedContainer
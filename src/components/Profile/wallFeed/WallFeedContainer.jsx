import { connect } from "react-redux"
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer'
import WallFeed from './wallFeed'


const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddPost: () => { dispatch(addPostActionCreator()) },
        onPostChange: (text) => {
            let action = updateNewPostTextActionCreator(text)
            dispatch(action)
        }

    }
}

const WallFeedContainer = connect(mapStateToProps, mapDispatchToProps)(WallFeed)

export default WallFeedContainer
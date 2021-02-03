import React from "react"
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer'
import WallFeed from './WallFeed'


const WallFeedContainer = (props) => {
    let state = props.store.getState()
    const onAddPost = () => {
        props.store.dispatch(addPostActionCreator())
    }

    const onPostChange = (text) => {
        let action = updateNewPostTextActionCreator(text)
        props.store.dispatch(action)
    }
    return (<WallFeed onAddPost={onAddPost} updateNewPostText={onPostChange} posts={state.profilePage.posts} newPostText={state.profilePage.newPostText} />)
}

export default WallFeedContainer
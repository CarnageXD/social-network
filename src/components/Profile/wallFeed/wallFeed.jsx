import s from "./WallFeed.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import React from "react"
import FeedPosts from './feedPosts/feedPosts';



const WallFeed = (props) => {
    const feed = props.posts.map(post => <FeedPosts id={post.id} message={post.message} />)

    const addPost = () => {
        props.onAddPost()
    }

    const onPostChange = (e) => {
        let text = e.target.value
        props.onPostChange(text)
    }
    return (
        <div className={s.wallFeed}>
            <div className={s.toPostNew}>
                <input onChange={onPostChange} value={props.newPostText} className={s.postInput} type='text' placeholder='Tell something new...'>
                </input>
                <button className={s.submitPost} onClick={addPost}>
                    <span><FontAwesomeIcon icon={faPaperPlane} /></span>
                </button>
            </div>
            {feed}
        </div>
    )
}

export default WallFeed
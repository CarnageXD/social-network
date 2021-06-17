import s from "./wallFeed.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import FeedPosts from './feedPosts/feedPosts';
import { FC } from "react";
import { PostsInterface } from "../../../types/reducersTypes/profileTypes";

interface WallFeedPropsInterface {
    posts: PostsInterface[],
    onAddPost: () => void,
    onPostChange: (text: string) => void,
    newPostText: string,
}

const WallFeed: FC<WallFeedPropsInterface> = (props) => {
    const feed = props.posts.map(post => <FeedPosts message={post.message} />)

    const addPost = () => {
        props.onAddPost()
    }

    const onPostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
import { addPost } from '../../../redux/state';
import FeedPosts from './feedPosts/feedPosts';
import ToPostNew from "./ToPostNew/ToPostNew";
import s from "./wallFeed.module.css"


const WallPosts = (props) => {
    const feed = props.posts.map(post => <FeedPosts id={post.id} message={post.message} />)
    return (
        <div className={s.wallFeed}>
            <ToPostNew newPostText={props.newPostText} dispatch={props.dispatch} />
            {feed}
        </div>
    )
}

export default WallPosts
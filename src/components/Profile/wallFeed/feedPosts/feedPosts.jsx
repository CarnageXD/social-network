import circleAvatar from './../../../../img/gridPhoto4.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import s from './feedPosts.module.css'

const FeedPosts = (props) => {
    return (
        <div className={s.feedPost}>
            <div className={s.postAvatar}>
                <img className={s.circleAvatar} src={circleAvatar}></img>
            </div>
            <div className={s.postText}>{props.message}</div>
            <div className={s.postReaction}>
                <FontAwesomeIcon className={s.comment} icon={faComment} />
                <FontAwesomeIcon className={s.heart} icon={faHeart} />
            </div>
        </div>
    )
}

export default FeedPosts
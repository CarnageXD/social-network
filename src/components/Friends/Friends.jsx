import s from './Friends.module.css'
import Paginator from '../common/paginator/Paginator'
import User from './User/User'


const Friends = (props) => {
    return (
        <div className={s.friendsWrapper} > {
            props.users.map((friend) =>
                <User key={friend.id} avatar={friend.photos.large} {...friend} userID={friend.id} {...props} />)
            // <User key={friend.id} avatar={friend.photos.large} followed={friend.followed}   name={friend.name} location={friend.location} status={friend.status} userID={friend.id} onFollow={props.onFollow} isFollowingProgress={props.isFollowingProgress} followUser={props.followUser} unFollowUser={props.unFollowUser} />)
        }
            {/* <div className={s.showMore} >
                <button className={s.showMoreButton} onClick={props.getUsers}>Show More</button>
            </div> */}
            <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged} totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} />
        </div>
    )

}

export default Friends
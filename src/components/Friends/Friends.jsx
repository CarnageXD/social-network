import s from './Friends.module.css'
import User from './User/User'


const Friends = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div className={s.friendsWrapper} > {
            props.users.map((friend) =>
                <User followed={friend.followed} key={friend.id} avatar={friend.photos.large} name={friend.name} location={friend.location} status={friend.status} userID={friend.id} onFollow={props.onFollow} />)
        }
            {/* <div className={s.showMore} >
                <button className={s.showMoreButton} onClick={props.getUsers}>Show More</button>
            </div> */}
            <div className={s.pagesWrapper}>
                {pages.map(p => <span onClick={() => props.onPageChanged(p)}
                    className={`${props.currentPage === p && s.selectedPage} ${s.pageNumber}`}>{p}</span>)}
            </div>
        </div>
    )

}

export default Friends
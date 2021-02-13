import s from './User.module.css'
import circleAvatar1 from './../../../img/brad.png'



const User = (props) => {
    return (
        <div className={s.friendContainer}>
            <div className={s.user}>
                <div className={s.aboutUser}>
                    <div className={s.userAvatar}>
                        <img className={s.circleAvatar} src={props.avatar || circleAvatar1}></img>
                    </div>
                    <div className={s.userInfo}>
                        <div className={s.userName}>{props.name}</div>
                        <div className={s.userCity}>{'USA, FL, Miami'}</div>
                        {/* <div className={s.userCity}>{props.location.country}, {props.location.state}, {props.location.city}</div> */}
                    </div>
                </div>
                <div className={s.sendMessageUser}>
                    <button className={s.sendMessageButton}>Send message</button>
                </div>
            </div>
            <div className={s.userStatus}>
                <div className={s.onlineStatus}>{'online'}</div>
                {/* <div className={s.onlineStatus}>{props.status}</div> */}
                <div className={s.followStatus}>
                    {props.followed ?
                        <button className={s.followButton} onClick={() => { props.onFollow(props.userID, props.bool) }}>Unfollow</button> :
                        <button className={s.followButton} onClick={() => { props.onFollow(props.userID, props.bool) }}>Follow</button>
                    }
                </div>
            </div>
        </div>
    )
}


export default User
import AboutUser from './aboutUser/aboutUser'
import s from './Profile.module.css'
import WallFeedContainer from './wallFeed/WallFeedContainer';


const Profile = (props) => {
    return (
        <div className={s.profile}>
            <div className={s.profileWrapper}>
                <AboutUser />
                <WallFeedContainer />
                {/* <WallFeedContainer store={props.store} /> */}
            </div>
        </div>
    )
}

export default Profile
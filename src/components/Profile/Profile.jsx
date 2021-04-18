import AboutUser from './aboutUser/aboutUser'
import s from './Profile.module.css'
import WallFeedContainer from './wallFeed/WallFeedContainer';
import Preloader from '../common/preloader/Preloader'



const Profile = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div className={s.profile}>
            <div className={s.profileWrapper}>
                <AboutUser profile={props.profile} userJob={props.userJob} updateUserJob={props.updateUserJob} />
                <WallFeedContainer />
            </div>
        </div>
    )
}

export default Profile
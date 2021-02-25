import AboutUser from './aboutUser/aboutUser'
import s from './Profile.module.css'
import WallFeedContainer from './wallFeed/WallFeedContainer';
import Preloader from '../common/Preloader'
import { Redirect } from 'react-router-dom';



const Profile = (props) => {
    if (props.isAuth === false) return <Redirect to='/login' />
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div className={s.profile}>
            <div className={s.profileWrapper}>
                <AboutUser profile={props.profile} />
                <WallFeedContainer />
            </div>
        </div>
    )
}

export default Profile
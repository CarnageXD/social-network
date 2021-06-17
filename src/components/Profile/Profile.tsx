import AboutUser from './aboutUser/aboutUser'
import s from './Profile.module.css'
import WallFeedContainer from './wallFeed/WallFeedContainer';
import Preloader from '../common/preloader/Preloader'
import { FC } from 'react';
import { ProfileInterface } from '../../types/reducersTypes/profileTypes';
import { UserInterface } from '../../types/reducersTypes/friendsTypes';

interface ProfilePropsInterface {
    profile: ProfileInterface & UserInterface,
    userJob: string,
    updateUserJob: (job: string) => void,
    isOwner: boolean,
    saveAvatar: (file: File) => void,
}

const Profile: FC<ProfilePropsInterface> = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div className={s.profile}>
            <div className={s.profileWrapper}>
                <AboutUser profile={props.profile} userJob={props.userJob} updateUserJob={props.updateUserJob} isOwner={props.isOwner} saveAvatar={props.saveAvatar} />
                <WallFeedContainer />
            </div>
        </div>
    )
}

export default Profile
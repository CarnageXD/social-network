import AboutUser from './aboutUser/aboutUser'
import s from './Profile.module.css'
import WallFeedContainer from './wallFeed/WallFeedContainer';
import Preloader from '../common/preloader/Preloader'
import { FC, useEffect } from 'react';
import { ProfileInterface } from '../../types/reducersTypes/profileTypes';
import { UserInterface } from '../../types/reducersTypes/friendsTypes';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { useHistory } from 'react-router-dom';
import { getUserJob, getUserProfile, saveAvatar, updateUserJob } from '../../redux/profile-reducer';

interface ProfilePropsInterface {

}

const Profile: FC<ProfilePropsInterface> = (props) => {
    let { userID } = useParams(undefined);
    const history = useHistory();
    const dispatch = useDispatch();
    const loggedId = useSelector<AppStateType>(state => state.auth.id)

    useEffect(() => {
        loadProfile()
    }, [userID])

    const loadProfile = () => {
        if (!userID) {
            userID = loggedId;
            if (!loggedId) history.push('/login')
        }
        dispatch(getUserProfile(userID))
        dispatch(getUserJob(userID))
    }

    const profile = useSelector((state: AppStateType) => state.profilePage.profile)
    const userJob = useSelector((state: AppStateType) => state.profilePage.userJob)

    const saveUserAvatar = (file: File) => {
        dispatch(saveAvatar(file))
    }

    const updateJob = (job: string) => {
        dispatch(updateUserJob(job))
    }

    if (!profile) {
        return <Preloader />
    }
    return (
        <div className={s.profile}>
            <div className={s.profileWrapper}>
                <AboutUser photosProfile={profile} infoProfile={profile} userJob={userJob} updateUserJob={updateJob} isOwner={!userID}
                    saveAvatar={saveUserAvatar} />
                <WallFeedContainer />
            </div>
        </div>
    )
}

export default Profile
import UserInformation from './userInformation/userInformation'
import UserPhotos from './userPhotos/userPhotos'
import s from './aboutUser.module.css'
import { FC } from 'react'
import { ProfileInterface } from '../../../types/reducersTypes/profileTypes'
import { UserInterface } from '../../../types/reducersTypes/friendsTypes'

interface AboutUserPropsInterface {
    photosProfile: ProfileInterface,
    infoProfile: ProfileInterface
    isOwner: boolean,
    saveAvatar: (file: File) => void,
    userJob: string,
    updateUserJob: (job: string) => void,
}

const aboutUser: FC<AboutUserPropsInterface> = (props) => {
    return (
        <div className={s.aboutUser}>
            <UserPhotos profile={props.photosProfile} isOwner={props.isOwner} saveAvatar={props.saveAvatar} />
            <UserInformation profile={props.infoProfile} userJob={props.userJob} updateUserJob={props.updateUserJob} isOwner={props.isOwner} />
        </div>
    )
}

export default aboutUser
import UserInformation from './userInformation/userInformation'
import UserPhotos from './userPhotos/userPhotos'
import s from './aboutUser.module.css'

const aboutUser = (props) => {
    return (
        <div className={s.aboutUser}>
            <UserPhotos profile={props.profile} isOwner={props.isOwner} saveAvatar={props.saveAvatar} />
            <UserInformation profile={props.profile} userJob={props.userJob} updateUserJob={props.updateUserJob} isOwner={props.isOwner} />
        </div>
    )
}

export default aboutUser
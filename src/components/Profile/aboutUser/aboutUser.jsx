import UserInformation from './userInformation/userInformation'
import UserPhotos from './userPhotos/userPhotos'
import s from './aboutUser.module.css'

const aboutUser = () => {
    return (
        <div className={s.aboutUser}>
            <UserPhotos />
            <UserInformation name='Van Darkholme' birthday='26.09.2001' />
        </div>
    )
}

export default aboutUser
import userAvatar from './../../../../img/van-avatar.jpeg'
import gridPhoto1 from './../../../../img/gridPhoto1.png'
import gridPhoto2 from './../../../../img/gridPhoto2.jpg'
import gridPhoto3 from './../../../../img/gridPhoto3.png'
import gridPhoto4 from './../../../../img/gridPhoto4.jpg'
import s from './userPhotos.module.css'
import { FC } from 'react'
import { UserInterface } from '../../../../types/reducersTypes/friendsTypes'

interface UserPhotosPropsInterface {
    saveAvatar: (file: File) => void,
    isOwner: boolean,
    profile: UserInterface,
}

const UserPhotos: FC<UserPhotosPropsInterface> = (props) => {

    const onAvatarSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.saveAvatar(e.target.files[0])
        }
    }

    return (
        <div className={s.userPhotos}>
            <div className={s.itemAvatar}>
                <img className={s.itemAvatar} src={props.profile.photos.large || userAvatar} alt='test' />
            </div>
            <div className={s.avatarGrid}>
                <div className={s.item}>
                    <img src={gridPhoto1} alt='test'></img>
                </div>
                <div className={s.item}>
                    <img src={gridPhoto2} alt='test'></img>
                </div>
                <div className={s.item}>
                    <img src={gridPhoto3} alt='test'></img>
                </div>
                <div className={s.item}>
                    <img src={gridPhoto4} alt='test'></img>
                </div>
            </div>
            {props.isOwner ? <input type='file' onChange={onAvatarSelected}></input> : null}
        </div>
    )
}

export default UserPhotos
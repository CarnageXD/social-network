import userAvatar from './../../../../img/van-avatar.jpeg'
import gridPhoto1 from './../../../../img/gridPhoto1.png'
import gridPhoto2 from './../../../../img/gridPhoto2.png'
import gridPhoto3 from './../../../../img/gridPhoto3.png'
import gridPhoto4 from './../../../../img/gridPhoto4.jpg'
import s from './userPhotos.module.css'

const UserPhotos = (props) => {
    return (
        <div className={s.userPhotos}>
            <div className={s.itemAvatar}>
                <img className={s.itemAvatar} src={props.profile.photos.large || userAvatar} />
            </div>
            <div className={s.avatarGrid}>
                <div className={s.item}>
                    <img src={gridPhoto1}></img>
                </div>
                <div className={s.item}>
                    <img src={gridPhoto2}></img>
                </div>
                <div className={s.item}>
                    <img src={gridPhoto3}></img>
                </div>
                <div className={s.item}>
                    <img src={gridPhoto4}></img>
                </div>
            </div>
        </div>
    )
}

export default UserPhotos
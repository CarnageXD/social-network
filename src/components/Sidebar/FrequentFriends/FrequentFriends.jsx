import s from './FrequentFriends.module.css'


const FrequentFriends = (props) => {
    return (
        <div className={s.freqFriends}>
            <div className={s.item}>
                <div className={s.friendImg}>
                    <img src={props.avatar} className={s.circleAvatar} />
                </div>
                <div className={s.friendName}>{props.name}</div>
            </div>
        </div>
    )
}

export default FrequentFriends
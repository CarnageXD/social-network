import s from './userInformation.module.css'

const UserInformation = (props) => {
    return (
        <div className={s.userInformation}>
            <div className={`${s.name} ${s.item}`}>{props.name}</div>
            <div className={s.item}>Date birth: 26.09.2001</div>
            <div className={s.item}>Job: front-end developer</div>
            <div className={s.item}>Relationships: single</div>
            <div className={s.item}>Interests: programming, technologies</div>
            <div className={s.infoButton}><button>Add friend and start chatting</button></div>
        </div>

    )
}

export default UserInformation
import s from './userInformation.module.css'
import UserJobDescription from './UserJobDescription'

const UserInformation = (props) => {
    return (
        <div className={s.userInformation}>
            <div className={`${s.name} ${s.item}`}>{props.profile.fullName}</div>
            <div className={s.item}>Date birth: 26.09.2001</div>
            <div className={s.item}>Job: <UserJobDescription updateUserJob={props.updateUserJob} userJob={props.userJob} /></div>
            <div className={s.item}>Relationships: single</div>
            <div className={s.item}>Interests: programming, technologies</div>
            <div className={s.infoButton}><button>Add friend and start chatting</button></div>
        </div>

    )
}

export default UserInformation
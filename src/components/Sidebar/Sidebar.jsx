import s from './Sidebar.module.css'
import { NavLink } from "react-router-dom"
import FrequentFriends from './FrequentFriends/FrequentFriends'


const Sidebar = (props) => {
    const freqFriends =
        props.state.friendsImages.map(item => <FrequentFriends avatar={item.avatar} name={item.name} />)
    return (
        <aside className={s.sidebar}>
            <ul className={s.userSidebar}>
                <NavLink to='/profile' activeClassName={s.currentLink}>
                    <li className={`${s.item} ${s.profile}`}>Profile</li>
                </NavLink>
                <NavLink to='/friends' activeClassName={s.currentLink}>
                    <li className={`${s.item} ${s.friends}`}>Friends</li>
                </NavLink>
                <NavLink to='/dialogs' activeClassName={s.currentLink}>
                    <li className={`${s.item} ${s.dialogs}`}>Dialogs</li>
                </NavLink>
                <NavLink to='/playlist' activeClassName={s.currentLink}>
                    <li className={`${s.item} ${s.playlist}`}>Playlist</li>
                </NavLink>
                <NavLink to='/settings' activeClassName={s.currentLink}>
                    <li className={`${s.item} ${s.settings}`}>Settings</li>
                </NavLink>
            </ul>
            <div className={s.freqFriends}>
                {freqFriends}
            </div>
        </aside>)
}

export default Sidebar
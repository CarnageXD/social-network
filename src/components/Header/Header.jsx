import circleAvatar from './../../img/van-post.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import s from './Header.module.css'
import { NavLink } from 'react-router-dom';


const Header = (props) => {
    return (
        <header className={s.header}>
            <NavLink to='/profile'><div className={s.logo}>D U N G E O N</div></NavLink>
            <div className={s.userMenu}>
                {props.isAuth ? <><div className={s.userName}>{props.login}</div>
                    <div className={s.userAvatar}>
                        <img className={s.circleAvatar} src={circleAvatar}></img>
                    </div>
                    <div className={s.userTriangle}><FontAwesomeIcon icon={faCaretDown} />
                    </div></> : <NavLink to='/login'>Sign In</NavLink>}

                {/* <div className={s.userName}>{props.userName}</div>
                <div className={s.userAvatar}>
                    <img className={s.circleAvatar} src={circleAvatar}></img>
                </div>
                <div className={s.userTriangle}><FontAwesomeIcon icon={faCaretDown} />
                </div> */}
            </div>
        </header>
    )
}

export default Header
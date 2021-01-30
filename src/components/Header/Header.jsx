import circleAvatar from './../../img/van-post.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import s from './Header.module.css'


const Header = (props) => {
    return (
        <header className={s.header}>
            <a href='#'><div className={s.logo}>D U N G E O N</div></a>
            <div className={s.userMenu}>
                <div className={s.userName}>{props.userName}</div>
                <div className={s.userAvatar}>
                    <img className={s.circleAvatar} src={circleAvatar}></img>
                </div>
                <div className={s.userTriangle}><FontAwesomeIcon icon={faCaretDown} />
                </div>
            </div>
        </header>
    )
}

export default Header
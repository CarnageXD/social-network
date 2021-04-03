import { useState } from 'react'
import circleAvatar from './../../img/van-post.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import s from './Header.module.css'
import { Link, NavLink, Redirect } from 'react-router-dom';


const Header = (props) => {
    const [triangle, setTriangle] = useState(false)
    return (
        <header className={s.header}>
            <NavLink to='/profile'><div className={s.logo}>D U N G E O N</div></NavLink>
            <div className={s.userMenu}>
                {props.isAuth
                    ?
                    <>
                        <div className={s.userName}>{props.login}</div>
                        <div className={s.userAvatar}>
                            <img className={s.circleAvatar} src={circleAvatar}></img>
                        </div>
                        <div onClick={() => setTriangle((prev) => !prev)}
                            className={s.userTriangle}><FontAwesomeIcon icon={faCaretDown} /></div>
                        {triangle
                            ?
                            <ul tabIndex='1' onBlur={() => setTriangle(false)} className={s.dropdownMenu}>
                                <li onClick={() => setTriangle((prev) => !prev)}>
                                    <NavLink to='/settings'>Account Settings</NavLink></li>
                                <li onClick={() => {
                                    setTriangle((prev) => !prev)
                                    props.logout()
                                }
                                }>Logout</li>
                            </ul>
                            :
                            null
                        }

                    </>
                    :
                    <NavLink to='/login'>Sign In</NavLink>}

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
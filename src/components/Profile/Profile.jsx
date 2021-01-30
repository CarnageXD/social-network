import AboutUser from './aboutUser/aboutUser'
import WallPosts from './wallFeed/wallFeed';
import s from './Profile.module.css'


const Profile = (props) => {
    return (
        <div className={s.profile}>
            <div className={s.profileWrapper}>
                <AboutUser />
                <WallPosts newPostText={props.profilePage.newPostText} dispatch={props.dispatch} posts={props.profilePage.posts} />
            </div>
        </div>
    )
}

export default Profile
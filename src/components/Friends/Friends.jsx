import circleAvatar1 from './../../img/brad.png'
import circleAvatar2 from './../../img/steve.jpg'
import circleAvatar3 from './../../img/ricardo.jpg'
import circleAvatar4 from './../../img/billy.jpg'
import React from 'react'
import s from './Friends.module.css'
import User from './User/User'
import * as axios from 'axios'


class Friends extends React.Component {
    componentDidMount() {
        if (this.props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                this.props.setUsers(response.data.items)
            }
            )
        }
    }

    render() {
        return (
            <div className={s.friendsWrapper}>
                {this.props.users.map((friend) =>
                    <User followed={friend.followed} key={friend.id} avatar={friend.photos.large} name={friend.name} location={friend.location} status={friend.status} bool={friend.followed} userID={friend.id} onFollow={this.props.onFollow} />)}
                <div className={s.showMore}>
                    <button className={s.showMoreButton} onClick={this.getUsers}>Show More</button>
                </div>
            </div>
        )
    }
    getUsers = () => {
        if (this.props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                this.props.setUsers(response.data.items)
            }
            )
        }
    }
}

export default Friends
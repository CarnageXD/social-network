import { connect } from "react-redux"
import {
    followActionCreator, setUsersActionCreator,
    setCurrentPageActionCreator, setTotalUsersCountActionCreator,
    toggleIsFriendsFetchingActionCreator,
} from '../../redux/friends-reducer'
import React from 'react'
import * as axios from 'axios'
import Friends from './Friends'
import Preloader from "../common/Preloader"




class FriendsContainerRequests extends React.Component {
    componentDidMount() {
        if (this.props.users.length === 0) {
            this.props.toggleIsFriendsFetching(true)
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
                this.props.toggleIsFriendsFetching(false)
            }
            )
        }
    }
    getUsers = () => {
        axios.get('https://social-network.samuraijs.com/api/1.0/users?page=2').then(response => {
            this.props.setUsers(response.data.items)
        })
    }
    onPageChanged = (pageNumber) => {
        this.props.toggleIsFriendsFetching(true)
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.toggleIsFriendsFetching(false)

        }
        )
    }

    render() {
        return (
            <div>
                {this.props.isFetching ? <Preloader /> : null}
                <Friends onPageChanged={this.onPageChanged}
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    getUsers={this.getUsers}
                    users={this.props.users}
                    onFollow={this.props.onFollow} />
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.friendsPage.users,
        pageSize: state.friendsPage.pageSize,
        totalUsersCount: state.friendsPage.totalUsersCount,
        currentPage: state.friendsPage.currentPage,
        isFetching: state.friendsPage.isFetching,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFollow: (userID, followed) => { dispatch(followActionCreator(userID, followed)) },
        setUsers: (users) => { dispatch(setUsersActionCreator(users)) },
        setCurrentPage: (pageNumber) => { dispatch(setCurrentPageActionCreator(pageNumber)) },
        setTotalUsersCount: (totalCount) => { dispatch(setTotalUsersCountActionCreator(totalCount)) },
        toggleIsFriendsFetching: (isFetching) => { dispatch(toggleIsFriendsFetchingActionCreator(isFetching)) }
    }
}

const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsContainerRequests)

export default FriendsContainer
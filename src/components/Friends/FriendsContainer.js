import { connect } from "react-redux"
import { onFollow, setCurrentPage, toggleIsFollowingProgress, getUsers, followUser, unFollowUser }
    from '../../redux/friends-reducer'
import React from 'react'
import Friends from './Friends'
import Preloader from "../common/Preloader"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { compose } from "redux"


class FriendsContainerRequests extends React.Component {
    componentDidMount() {
        if (this.props.users.length === 0) {
            this.props.getUsers(this.props.currentPage, this.props.pageSize)
        }
    }
    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
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
                    onFollow={this.props.onFollow}
                    isFollowingProgress={this.props.isFollowingProgress}
                    followUser={this.props.followUser}
                    unFollowUser={this.props.unFollowUser}
                />
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
        isFollowingProgress: state.friendsPage.isFollowingProgress,
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onFollow: (userID, followed) => { dispatch(followActionCreator(userID, followed)) },
//         setUsers: (users) => { dispatch(setUsersActionCreator(users)) },
//         setCurrentPage: (pageNumber) => { dispatch(setCurrentPageActionCreator(pageNumber)) },
//         setTotalUsersCount: (totalCount) => { dispatch(setTotalUsersCountActionCreator(totalCount)) },
//         toggleIsFriendsFetching: (isFetching) => { dispatch(toggleIsFriendsFetchingActionCreator(isFetching)) }
//     }
// }

export default compose(
    connect(mapStateToProps, { onFollow, setCurrentPage, toggleIsFollowingProgress, getUsers, followUser, unFollowUser }),
    withAuthRedirect)(FriendsContainerRequests)
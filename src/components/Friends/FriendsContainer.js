import { connect } from "react-redux"
import { onFollow, setCurrentPage, toggleIsFollowingProgress, requestUsers, followUser, unFollowUser }
    from '../../redux/friends-reducer'
import React from 'react'
import Friends from './Friends'
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { compose } from "redux"
import { getCurrentPage, getIsFetching, getIsFollowingProgress, getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selectors"


class FriendsContainerRequests extends React.Component {
    componentDidMount() {
        if (this.props.users.length === 0) {
            this.props.requestUsers(this.props.currentPage, this.props.pageSize)
        }
    }
    onPageChanged = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return (
            <Friends onPageChanged={this.onPageChanged}
                totalUsersCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                getUsers={this.getUsers}
                users={this.props.users}
                onFollow={this.props.onFollow}
                isFollowingProgress={this.props.isFollowingProgress}
                followUser={this.props.followUser}
                unFollowUser={this.props.unFollowUser}
                currentPage={this.props.currentPage}
                isFetching={this.props.isFetching}
            />
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         users: state.friendsPage.users,
//         pageSize: state.friendsPage.pageSize,
//         totalUsersCount: state.friendsPage.totalUsersCount,
//         currentPage: state.friendsPage.currentPage,
//         isFetching: state.friendsPage.isFetching,
//         isFollowingProgress: state.friendsPage.isFollowingProgress,
//     }
// }

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowingProgress: getIsFollowingProgress(state),
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
    connect(mapStateToProps, { onFollow, setCurrentPage, toggleIsFollowingProgress, requestUsers, followUser, unFollowUser }),
    withAuthRedirect)(FriendsContainerRequests)
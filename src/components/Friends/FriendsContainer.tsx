import { connect } from 'react-redux'
import { requestUsers, followUser, unFollowUser }
    from '../../redux/friends-reducer'
import React from 'react'
import Friends from './Friends'
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { compose } from "redux"
import { getCurrentPage, getIsFetching, getIsFollowingProgress, getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selectors"
import { UserInterface } from "../../types/reducersTypes/friendsTypes"
import { AppStateType } from "../../redux/redux-store"

interface FriendsMapStateToPropsInterface {
    currentPage: number,
    pageSize: number,
    users: Array<UserInterface>
    totalItemsCount: number,
    isFollowingProgress: Array<number>,
    isFetching: boolean,
}

interface FriendsMapDispatchToPropsInterface {
    requestUsers: (currentPage: number, pageSize: number) => void,
    followUser: (userID: number, followed: boolean) => void,
    unFollowUser: (userID: number, followed: boolean) => void,
}

type PropsType = FriendsMapStateToPropsInterface & FriendsMapDispatchToPropsInterface

class FriendsContainerRequests extends React.Component<PropsType> {
    componentDidMount() {
        if (this.props.users.length === 0) {
            this.props.requestUsers(this.props.currentPage, this.props.pageSize)
        }
    }
    onPageChanged = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return (
            <Friends onPageChanged={this.onPageChanged}
                totalItemsCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                users={this.props.users}
                isFollowingProgress={this.props.isFollowingProgress}
                followUser={this.props.followUser}
                unFollowUser={this.props.unFollowUser}
                currentPage={this.props.currentPage}
                isFetching={this.props.isFetching}
            />
        )

    }
}

const mapStateToProps = (state: AppStateType): FriendsMapStateToPropsInterface => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowingProgress: getIsFollowingProgress(state),
    }
}

export default compose(
    connect<FriendsMapStateToPropsInterface, FriendsMapDispatchToPropsInterface, {}, AppStateType>(mapStateToProps,
        { requestUsers, followUser, unFollowUser }), withAuthRedirect)(FriendsContainerRequests) as React.ComponentType
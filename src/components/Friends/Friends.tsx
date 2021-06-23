import s from './Friends.module.css'
import Paginator from '../common/paginator/Paginator'
import User from './User/User'
import Preloader from '../common/preloader/Preloader'
import React, { FC, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentPage, getFilter, getIsFetching, getIsFollowingProgress, getPageSize, getTotalUsersCount, getUsers } from '../../redux/users-selectors'
import { requestUsers, followUser, unFollowUser } from '../../redux/friends-reducer'
import { useHistory } from 'react-router-dom'


type FriendsPropsType = {}

export const Friends: FC<FriendsPropsType> = ({ ...props }) => {

    const users = useSelector(getUsers)
    const totalItemsCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const isFollowingProgress = useSelector(getIsFollowingProgress)
    const isFetching = useSelector(getIsFetching)
    const filter = useSelector(getFilter)

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        history.push({
            pathname: '/friends',
            search: `?friend=${filter}&currentPage=${currentPage}`
        })
    }, [filter, currentPage])

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: boolean | null) => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }

    const follow = (userID: number, followed: boolean) => {
        dispatch(followUser(userID, followed))
    }

    const unfollow = (userID: number, followed: boolean) => {
        dispatch(unFollowUser(userID, followed))
    }

    return (
        <div className={s.friendsWrapper}>
            <div className={s.filter}>
                <span className={s.filterTitle}>Filter: </span>
                <select onChange={useMemo(() => (e: React.ChangeEvent<HTMLSelectElement>) => {
                    let filterChanged = null;
                    switch (e.target.value) {
                        case 'followed': {
                            filterChanged = true;
                            break;
                        }
                        case 'unfollowed': {
                            filterChanged = false;
                            break;
                        }
                        default: filterChanged = null;
                    }
                    onFilterChanged(filterChanged)
                }, [filter])}>
                    <option selected value="all">All</option>
                    <option value="followed">Only followed</option>
                    <option value="unfollowed">Only unfollowed</option>
                </select>
            </div>
            {
                isFetching ? <Preloader /> :
                    users.map((friend) =>
                        <User key={friend.id} {...friend} userAvatar={friend.photos.large} userID={friend.id} followUser={follow} unFollowUser={unfollow} isFollowingProgress={isFollowingProgress} />)
            }
            <div className={s.paginatorWrapper}>
                <Paginator pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalItemsCount} />
            </div>
        </div>
    )

}

// <User key={friend.id} avatar={friend.photos.large} followed={friend.followed}   name={friend.name} location={friend.location} status={friend.status} userID={friend.id} onFollow={props.onFollow} isFollowingProgress={props.isFollowingProgress} followUser={props.followUser} unFollowUser={props.unFollowUser} />)
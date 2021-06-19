import s from './Friends.module.css'
import Paginator from '../common/paginator/Paginator'
import User from './User/User'
import Preloader from '../common/preloader/Preloader'
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentPage, getIsFetching, getIsFollowingProgress, getPageSize, getTotalUsersCount, getUsers } from '../../redux/users-selectors'
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

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize))
    }, [currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize))
    }

    const follow = (userID: number, followed: boolean) => {
        dispatch(followUser(userID, followed))
    }

    const unfollow = (userID: number, followed: boolean) => {
        dispatch(unFollowUser(userID, followed))
    }

    return (
        <div className={s.friendsWrapper}>
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
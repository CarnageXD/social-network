import s from './Friends.module.css'
import Paginator, { PaginatorPropsInterface } from '../common/paginator/Paginator'
import User from './User/User'
import Preloader from '../common/preloader/Preloader'
import { FC } from 'react'
import { UserInterface } from '../../types/reducersTypes/friendsTypes'


interface FriendsPropsInterface {
    users: Array<UserInterface>,
    isFetching: boolean,
    isFollowingProgress: Array<number>,
    followUser: (userID: number, followed: boolean) => void,
    unFollowUser: (userID: number, followed: boolean) => void,
}

type FriendsPropsType = FriendsPropsInterface & PaginatorPropsInterface

const Friends: FC<FriendsPropsType> = ({ ...props }) => {
    return (
        <div className={s.friendsWrapper}>
            {
                props.isFetching ? <Preloader /> :
                    props.users.map((friend) =>
                        <User key={friend.id} avatar={friend.photos.large} {...friend} userID={friend.id} {...props} />)
            }
            <div className={s.paginatorWrapper}>
                <Paginator pageSize={props.pageSize} currentPage={props.currentPage} onPageChanged={props.onPageChanged} totalItemsCount={props.totalItemsCount} />
            </div>
        </div>
    )

}

export default Friends



// <User key={friend.id} avatar={friend.photos.large} followed={friend.followed}   name={friend.name} location={friend.location} status={friend.status} userID={friend.id} onFollow={props.onFollow} isFollowingProgress={props.isFollowingProgress} followUser={props.followUser} unFollowUser={props.unFollowUser} />)
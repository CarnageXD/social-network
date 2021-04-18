import { friendsReducer, setCurrentPage } from "./friends-reducer"

let state = {
    users: [
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    isFollowingProgress: [],
}

it('set page must be correct', () => {
    let action = setCurrentPage(5)
    let newState = friendsReducer(state, action)
    expect(newState.currentPage).toBe(5)
})
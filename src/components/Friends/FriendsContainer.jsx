import { connect } from "react-redux"
import { followActionCreator, setUsersActionCreator } from './../../redux/friends-reducer'
import Friends from './Friends'


const mapStateToProps = (state) => {
    return {
        users: state.friendsPage.users,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFollow: (userID, bool) => { dispatch(followActionCreator(userID, bool)) },
        setUsers: (users) => { dispatch(setUsersActionCreator(users)) }
    }
}

const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends)

export default FriendsContainer
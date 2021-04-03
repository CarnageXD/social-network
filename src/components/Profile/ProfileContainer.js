import React from 'react'
import Profile from './Profile';
import { connect } from 'react-redux'
import { getUserProfile, getUserJob, updateUserJob } from './../../redux/profile-reducer'
import { withRouter } from 'react-router-dom';
import { compose } from "redux"

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userID = this.props.match.params.userID
        if (!userID) {
            userID = this.props.loggedId;
            if (!this.props.loggedId) this.props.history.push('/login')
        }
        this.props.getUserProfile(userID)
        this.props.getUserJob(userID)
    }
    render() {
        return (<Profile {...this.props} profile={this.props.profile} userJob={this.props.userJob} updateUserJob={this.props.updateUserJob} />)
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        userJob: state.profilePage.userJob,
        loggedId: state.auth.id,
    }
}

export default compose(connect(mapStateToProps, { getUserProfile, getUserJob, updateUserJob }), withRouter)(ProfileContainer)
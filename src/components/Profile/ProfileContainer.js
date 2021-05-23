import React from 'react'
import Profile from './Profile';
import { connect } from 'react-redux'
import { getUserProfile, getUserJob, updateUserJob, saveAvatar } from './../../redux/profile-reducer'
import { withRouter } from 'react-router-dom';
import { compose } from "redux"

class ProfileContainer extends React.Component {
    loadProfile() {
        let userID = this.props.match.params.userID
        if (!userID) {
            userID = this.props.loggedId;
            if (!this.props.loggedId) this.props.history.push('/login')
        }
        this.props.getUserProfile(userID)
        this.props.getUserJob(userID)
    }

    componentDidMount() {
        this.loadProfile()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.userID !== this.props.match.params.userID)
            this.loadProfile()
    }

    render() {
        return (<Profile {...this.props} profile={this.props.profile} userJob={this.props.userJob} updateUserJob={this.props.updateUserJob} isOwner={!this.props.match.params.userID} saveAvatar={this.props.saveAvatar} />)
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        userJob: state.profilePage.userJob,
        loggedId: state.auth.id,
    }
}

export default compose(connect(mapStateToProps, { getUserProfile, getUserJob, updateUserJob, saveAvatar }), withRouter)(ProfileContainer)
import React from 'react'
import Profile from './Profile';
import { connect } from 'react-redux'
import { getUserProfile, getUserJob, updateUserJob, saveAvatar } from '../../redux/profile-reducer'
import { withRouter } from 'react-router'
import { compose } from "redux"
import { AppStateType } from '../../redux/redux-store';
import { RouteComponentProps } from 'react-router';

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getUserProfile: (userID: number) => void,
    getUserJob: (userID: number) => void,
    updateUserJob: (job: string) => void,
    saveAvatar: (file: File) => void,

}

type RouteParamsProps = ReturnType<typeof RouteComponentProps>

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteParamsProps

class ProfileContainer extends React.Component<PropsType> {
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

    componentDidUpdate(prevProps: PropsType, prevState: AppStateType) {
        if (prevProps.match.params.userID !== this.props.match.params.userID)
            this.loadProfile()
    }

    render() {
        return (<Profile {...this.props} profile={this.props.profile} userJob={this.props.userJob} updateUserJob={this.props.updateUserJob} isOwner={!this.props.match.params.userID} saveAvatar={this.props.saveAvatar} />)
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        userJob: state.profilePage.userJob,
        loggedId: state.auth.id,
    }
}

export default compose<React.ComponentType>(connect(mapStateToProps, { getUserProfile, getUserJob, updateUserJob, saveAvatar }), withRouter)(ProfileContainer)
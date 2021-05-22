import s from './userInformation.module.css'
import React from 'react'

interface PropsType {
    userJob: string,
    updateUserJob: (userJob: string) => void,
}

interface StateType {
    editMode: boolean,
    userJob: string,
}

class UserJobDescription extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        userJob: this.props.userJob
    }
    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.userJob != this.props.userJob) {
            this.setState({
                userJob: this.props.userJob
            })
        }
    }
    toggleEditMode = () => {
        if (this.state.editMode) {
            this.setState({ editMode: false, })
            this.props.updateUserJob(this.state.userJob)
        }
        else {
            this.setState({ editMode: true, })
        }
    }

    onUserJobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ userJob: e.currentTarget.value })
    }



    render() {
        return (
            <div className={s.userJobDescription}>
                {
                    !this.state.editMode
                        ?
                        <div onDoubleClick={this.toggleEditMode}>{this.state.userJob || 'No status'}</div>
                        :
                        <div className={s.inputEditModeBlock}>
                            <input onChange={this.onUserJobChange} className={s.inputEditMode} onBlur={this.toggleEditMode} autoFocus={true} type="text" value={this.state.userJob} />
                        </div>
                }
            </div>
        )
    }
}

export default UserJobDescription
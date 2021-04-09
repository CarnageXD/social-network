import s from './userInformation.module.css'
import React, { useState } from 'react'

const UserJobDescriptionWithHooks = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [userJob, setUserJob] = useState(props.userJob)

    const toggleEditMode = () => {
        if (editMode) {
            setEditMode(false)
            props.updateUserJob(userJob)
        }
        else {
            setEditMode(true)
        }
    }

    const onUserJobChange = (e) => {
        setUserJob(e.currentTarget.value)
    }
    return (
        <div className={s.userJobDescription}>
            {
                !editMode
                    ?
                    <div onDoubleClick={toggleEditMode}>{props.userJob || 'No job status'}</div>
                    :
                    <div className={s.inputEditModeBlock}>
                        <input onChange={onUserJobChange} className={s.inputEditMode} onBlur={toggleEditMode} autoFocus={true} type="text" value={userJob} />
                    </div>
            }
        </div>
    )
}
export default UserJobDescriptionWithHooks
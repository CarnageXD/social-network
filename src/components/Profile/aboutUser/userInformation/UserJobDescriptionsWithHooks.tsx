import s from './userInformation.module.css'
import React, { useState, useEffect, FC } from 'react'

interface UserJobPropsInterface {
    userJob: string,
    updateUserJob: (userJob: string) => void,
}

const UserJobDescriptionWithHooks: FC<UserJobPropsInterface> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [userJob, setUserJob] = useState<string>(props.userJob)

    useEffect(() => {
        setUserJob(props.userJob)
    }, [props.userJob])

    const toggleEditMode = () => {
        if (editMode) {
            setEditMode(false)
            props.updateUserJob(userJob)
        }
        else {
            setEditMode(true)
        }
    }

    const onUserJobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserJob(e.currentTarget.value)
    }
    return (
        <div className={s.userJobDescription}>
            {
                !editMode
                    ?
                    <div onDoubleClick={toggleEditMode}>{userJob || 'No job status'}</div>
                    :
                    <div className={s.inputEditModeBlock}>
                        <input onChange={onUserJobChange} className={s.inputEditMode} onBlur={toggleEditMode} autoFocus={true} type="text" value={userJob} />
                    </div>
            }
        </div>
    )
}
export default UserJobDescriptionWithHooks
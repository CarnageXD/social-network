import React from 'react'
import Profile from './Profile';
import { AppStateType } from '../../redux/redux-store';

type PropsType = {

}

const ProfileContainer: React.FC<PropsType> = () => {
    return (<Profile />)
}

export default ProfileContainer
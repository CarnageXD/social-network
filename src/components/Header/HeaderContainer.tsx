import React, { ComponentType } from 'react'
import { logout } from '../../redux/auth-reducer'
import Header from './Header'
import { connect } from "react-redux"
import { AppStateType } from '../../redux/redux-store'


interface PropsType {
    isAuth: boolean,
    logout: () => void,
    login: null | string,
}

class HeaderContainer extends React.Component<PropsType> {
    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect<{ isAuth: boolean, login: null | string }, { logout: () => void }, {}, AppStateType>(mapStateToProps, { logout })(HeaderContainer) as ComponentType
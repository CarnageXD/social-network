import { Redirect } from 'react-router-dom'
import { connect } from "react-redux"
import React from 'react'


const mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect(WrappedComponent) {
    const RedirectComponent = (props) => {
        if (!props.isAuth) return <Redirect to='/login' />
        return <WrappedComponent {...props} />
    }

    let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedRedirectComponent
}

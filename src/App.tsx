import React from 'react'
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Playlist from './components/Playlist/Playlist';
import Settings from './components/Settings/Settings';
import { Redirect, Route, Switch } from 'react-router-dom'
import FriendsContainer from './components/Friends/FriendsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/preloader/Preloader';
import { withSuspense } from './hoc/withSuspense';
import { AppStateType } from './redux/redux-store';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

interface MapDispatchToPropsInterface {
  initializeApp: () => void,
}

type AppProps = ReturnType<typeof mapStateToProps> & MapDispatchToPropsInterface

class App extends React.Component<AppProps> {
  catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
    console.error(promiseRejectionEvent)
  }

  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) return <Preloader />
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Sidebar state={this.props.frequentFriends} />
        <div className='app-wrapper-content'>
          <Switch>
            <Route exact path='/first-project' render={() => <Redirect from='/' to='/profile' />} />
            <Route path='/profile/:userID?' render={() => <SuspendedProfile />} />
            <Route path='/friends' render={() => <FriendsContainer />} />
            <Route path='/dialogs' render={() => <SuspendedDialogs />} />
            <Route path='/playlist' component={Playlist} />
            <Route path='/settings' component={Settings} />
            <Route path='/login' component={Login}></Route>
            <Route path='*' render={() => <div>404 not found</div>}></Route>
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.initApp.initialized,
  frequentFriends: state.frequentFriends,
})

export default connect(mapStateToProps, { initializeApp })(App)

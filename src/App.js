import React from 'react'
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Profile from './components/Profile/Profile';
import Playlist from './components/Playlist/Playlist';
import Settings from './components/Settings/Settings';
import { Redirect, Route, Switch } from 'react-router-dom'
// import DialogsContainer from './components/Dialogs/DialogsContainer';
import FriendsContainer from './components/Friends/FriendsContainer';
// import ProfileContainer from './components/Profile/ProfileContainer.js';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/preloader/Preloader';
import { withSuspense } from './hoc/withSuspense';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {
  catchAllUnhandledErrors = (promiseRejectionEvent) => {
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
        <Sidebar state={this.props.state.frequentFriends} />
        <div className='app-wrapper-content'>
          <Switch>
            <Route exact path='/' render={() => <Redirect from='/' to='/profile' />} />
            <Route path='/profile/:userID?' render={withSuspense(ProfileContainer)} />
            <Route path='/friends' render={() => <FriendsContainer />} />
            <Route path='/dialogs' render={withSuspense(DialogsContainer)} />
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

const mapStateToProps = (state) => ({
  initialized: state.initApp.initialized
})

export default connect(mapStateToProps, { initializeApp })(App)

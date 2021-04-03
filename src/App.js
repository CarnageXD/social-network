import React from 'react'
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Profile from './components/Profile/Profile';
import Playlist from './components/Playlist/Playlist';
import Settings from './components/Settings/Settings';
import { Route } from 'react-router-dom'
import DialogsContainer from './components/Dialogs/DialogsContainer';
import FriendsContainer from './components/Friends/FriendsContainer';
import ProfileContainer from './components/Profile/ProfileContainer.js';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader';


class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()

  }
  render() {
    if (!this.props.initialized) return <Preloader />
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Sidebar state={this.props.state.frequentFriends} />
        <div className='app-wrapper-content'>
          <Route path="/" exact component={Profile} />
          <Route path='/profile/:userID?' render={() => <ProfileContainer />} />
          <Route path='/friends' render={() => <FriendsContainer />} />
          <Route path='/dialogs' render={() => <DialogsContainer />} />
          <Route path='/playlist' component={Playlist} />
          <Route path='/settings' component={Settings} />
          <Route path='/login' component={Login}></Route>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.initApp.initialized
})

export default connect(mapStateToProps, { initializeApp })(App)

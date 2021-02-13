import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Profile from './components/Profile/Profile';
import Friends from './components/Friends/Friends';
import Playlist from './components/Playlist/Playlist';
import Settings from './components/Settings/Settings';
import { Route } from 'react-router-dom'
import DialogsContainer from './components/Dialogs/DialogsContainer';
import FriendsContainer from './components/Friends/FriendsContainer';


const App = (props) => {
  return (
    <div className='app-wrapper'>
      <Header userName="Van" />
      <Sidebar state={props.state.frequentFriends} />
      <div className='app-wrapper-content'>
        <Route path="/" exact component={Profile} />
        <Route path='/profile' render={() => <Profile />} />
        <Route path='/friends' render={() => <FriendsContainer store={props.state} />} />
        <Route path='/dialogs' render={() => <DialogsContainer store={props.store} />} />
        <Route path='/playlist' component={Playlist} />
        <Route path='/settings' component={Settings} />
      </div>
    </div>
  )
}


export default App;
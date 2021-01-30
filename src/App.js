import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Profile from './components/Profile/Profile';
import Friends from './components/Friends/Friends';
import Dialogs from './components/Dialogs/Dialogs';
import Playlist from './components/Playlist/Playlist';
import Settings from './components/Settings/Settings';
import { Route } from 'react-router-dom'


const App = (props) => {
  return (

    <div className='app-wrapper'>
      <Header userName="Van" />
      <Sidebar state={props.state.frequentFriends} />
      <div className='app-wrapper-content'>
        <Route path='/profile' render={() =>
          <Profile dispatch={props.dispatch} profilePage={props.state.profilePage} />}
        />
        <Route path='/friends' render={() => <Friends />} />
        <Route path='/dialogs' render={() => <Dialogs state={props.state.dialogsPage} />} />
        <Route path='/playlist' component={Playlist} />
        <Route path='/settings' component={Settings} />
      </div>
    </div>
  )
}


export default App;
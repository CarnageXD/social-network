import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Profile from './components/Profile/Profile';
import Friends from './components/Friends/Friends';
import Playlist from './components/Playlist/Playlist';
import Settings from './components/Settings/Settings';
import { Route } from 'react-router-dom'
import DialogsContainer from './components/Dialogs/DialogsContainer';


const App = (props) => {
  debugger
  return (
    <div className='app-wrapper'>
      <Header userName="Van" />
      <Sidebar state={props.state.frequentFriends} />
      <div className='app-wrapper-content'>
        <Route path='/profile' render={() => <Profile store={props.store} />} />
        <Route path='/friends' render={() => <Friends />} />
        <Route path='/dialogs' render={() => <DialogsContainer store={props.store} />} />
        <Route path='/playlist' component={Playlist} />
        <Route path='/settings' component={Settings} />
      </div>
    </div>
  )
}


export default App;
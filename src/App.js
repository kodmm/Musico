import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Users from './components/users';
import Login from './components/login';
import Songs from './components/songs';
import Playlists from './components/playlists';
import Playlist from './components/playlist';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import PageviewIcon from '@material-ui/icons/Pageview';

function App() {
  return (

    <BrowserRouter>
      <div>
        <header>

          <Link to="/playlists">MyPlaylists<FeaturedPlayListIcon style={{ fontSize: 40 }}/></Link>
          <Link to="/songs">SearchMusic<PageviewIcon style={{ fontSize: 40 }}/></Link>
        </header>
        <Switch>
          <Route exact path="/users" component={Users} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/songs" component={Songs} />
          <Route exact path="/playlists" component={Playlists} />
          <Route ezact path="/playlist/:name" component={Playlist} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

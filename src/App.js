import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Users from './components/users';
import Login from './components/login';
import Songs from './components/songs';
import Playlists from './components/playlists';
import Playlist from './components/playlist';
import Header from './components/header';
import Grid from '@material-ui/core/Grid';






function App() {
  return (
    <BrowserRouter>
        <Grid container>
            <Header />
        </Grid>
        <Switch>
          <Route exact path="/users" component={Users} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/songs" component={Songs} />
          <Route exact path="/playlists" component={Playlists} />
          <Route ezact path="/playlist/:name" component={Playlist} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;

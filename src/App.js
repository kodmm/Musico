import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Users from './components/users';
import Login from './components/login';
import Songs from './components/songs';
import Playlists from './components/playlists';
import Playlist from './components/playlist';
import Header from './components/header';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f5f5f5"
  }
}))


function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
        <Grid container className={classes.root}>
            <Header />
          <Switch>
            <Route exact path="/users" component={Users} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/songs" component={Songs} />
            <Route exact path="/playlists" component={Playlists} />
            <Route ezact path="/playlist/:name" component={Playlist} />
          </Switch>
        </Grid>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Users from './components/users';
import Login from './components/login';
import Songs from './components/songs';
function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/users" component={Users} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/songs" component={Songs} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { AuthStateProvider } from './contexts/states/auth-state';
import authReducer, { initialState } from './contexts/reducers/auth-reducer';
import { coordinator } from './api/client';
import useAuth from './hooks/use-auth';
import Current from './pages/Current';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Row from './pages/Row';
import Profile from './pages/Profile';
import Nav from './components/Nav';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { member } = useAuth();
  console.info('Current Member ', member);

  useEffect(() => {
    console.info('Activating Coordinator');
    const activate = async () => {
      return await coordinator.activate();
    };
    activate();
  }, []);

  return (
    <Router>
      <div className="container">
        <header>
          <h1>
            <span role="img" aria-label="Person rowing boat">
              🚣
            </span>
            <span role="img" aria-label="Watch">
              ⌚
            </span>
          </h1>
        </header>
        <Nav />

        <main>
          <Switch>
            <Redirect exact from="/" to="/current" />
            <Route path="/current" component={Current} />
            <PrivateRoute path="/row" component={Row} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/logout" component={Logout} />
          </Switch>
        </main>
        <footer>These are wireframes to demonstrate functionality only</footer>
      </div>
    </Router>
  );
}

export default () => {
  return (
    <AuthStateProvider reducer={authReducer} initialState={initialState}>
      <App />
    </AuthStateProvider>
  );
};

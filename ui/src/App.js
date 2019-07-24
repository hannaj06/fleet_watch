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
import { Current, Login, Logout, MyTrips, Profile, Row } from './pages/pages';
import { Header, PrivateRoute } from './components/components';

function App() {
  useEffect(() => {
    console.info('Activating Coordinator');
    const activate = async () => {
      return await coordinator.activate();
    };
    activate();
  }, []);

  const { member, isLoading } = useAuth();
  console.info('Current Member ', member);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Router>
      <div className="font-sans leading-normal tracking-normal">
        <Header />

        <main>
          <div className="container h-full w-full mx-auto pt-20 pb-2">
            <div className="justify-center w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
              <Switch>
                <Redirect exact from="/" to="/current" />
                <Route path="/current" component={Current} />
                <PrivateRoute path="/row" component={Row} />
                <PrivateRoute path="/my-trips" component={MyTrips} />
                <PrivateRoute path="/profile" component={Profile} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/logout" component={Logout} />
              </Switch>
            </div>
          </div>
        </main>
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

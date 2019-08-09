import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { LogLevel } from '@orbit/coordinator';
import { AuthStateProvider } from './contexts/states/auth-state';
import authReducer, { initialState } from './contexts/reducers/auth-reducer';
import { coordinator } from './api/client';
import useAuth from './hooks/use-auth';
import {
  Current,
  Login,
  Logout,
  MyTrips,
  Profile,
  Row,
  Weather,
} from './pages';
import { Header, PrivateRoute, Loader } from './components';
import { Container } from './services/notifications';

function App() {
  const { member, isLoading } = useAuth();
  console.info('Current Member ', member);

  return isLoading ? (
    <Loader />
  ) : (
    <Router>
      <div className="font-sans leading-normal tracking-normal">
        <Header member={member} />

        <main>
          <div className="container h-full w-full mx-auto pt-20 pb-2">
            <div className="justify-center w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
              <Switch>
                <Redirect exact from="/" to="/current" />

                <Route path="/current" component={Current} />
                <Route path="/weather" component={Weather} />
                <Route path="/login" component={Login} />

                <PrivateRoute path="/row" component={Row} />
                <PrivateRoute path="/my-trips" component={MyTrips} />
                <PrivateRoute path="/profile" component={Profile} />
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
  let [isReady, setIsReady] = useState(false);
  useEffect(() => {
    console.info('Activating Coordinator');
    const activate = async () => {
      try {
        await coordinator.activate({ logLevel: LogLevel.Info });
        console.info('Coordinator Activated');
      } catch (e) {
        console.error(e);
      }
      setIsReady(true);
    };
    activate();
  }, []);

  return isReady ? (
    <AuthStateProvider reducer={authReducer} initialState={initialState}>
      <App />
      <Container />
    </AuthStateProvider>
  ) : (
    <></>
  );
};

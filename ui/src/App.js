import React, { useEffect, useState } from 'react';
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
import {
  Current,
  Login,
  Logout,
  MyTrips,
  Profile,
  Row,
  Weather,
} from './pages/pages';
import { Header, PrivateRoute, Loader } from './components/components';
import { LogLevel } from '@orbit/coordinator';
import { Container } from './services/notifications';

function Wrapper() {
  let [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    console.info('Activating Coordinator');
    const activate = async () => {
      try {
        await coordinator.activate({ logLevel: LogLevel.Info });
        setIsLoaded(true);
        console.log('Coordinator activated');
      } catch (e) {
        console.error(e);
      }
    };
    activate();
  }, []);

  return isLoaded ? <App /> : <></>;
}

function App() {
  const { member, isLoading } = useAuth();
  console.info('Current Member ', member);

  return isLoading ? (
    <Loader />
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
                <Route path="/weather" component={Weather} />
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
      <Wrapper />
      <Container />
    </AuthStateProvider>
  );
};

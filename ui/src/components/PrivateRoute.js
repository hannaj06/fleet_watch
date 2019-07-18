import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthState } from '../contexts/states/auth-state';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [{ member }] = useAuthState();

  return (
    <Route
      {...rest}
      render={(props) =>
        member ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

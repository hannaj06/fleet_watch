import React, { useState } from 'react';
import { useAuthState } from '../contexts/states/auth-state';
import { useInputValue } from '../hooks/use-input-value';
import api from '../api/client';
import { Redirect } from 'react-router-dom';

function Login() {
  const [{ member }, dispatch] = useAuthState();
  const [authAttempted, setAuthAttempted] = useState(false);
  const email = useInputValue('');
  const password = useInputValue('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthAttempted(true);
    try {
      const { data: auth } = await api.login(email.value, password.value);
      dispatch({ type: 'LOGIN', auth });
    } catch (e) {
      console.error(e);
      setAuthAttempted(false);
    }
  };

  return member ? (
    <Redirect to="/my-trips" />
  ) : authAttempted ? (
    <div>Logging in</div>
  ) : (
    <div className="m-auto max-w-md">
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            placeholder="Email"
            className="form-input"
            {...email}
          ></input>
        </div>
        <div className="mb-6">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-input"
            {...password}
          ></input>
        </div>
        <div className="flex items-center justify-between">
          <button className="btn confirm" type="submit">
            {' '}
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-grey-900 hover:text-blue-800"
            href="/login"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;

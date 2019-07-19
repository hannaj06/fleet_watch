import React, { useState } from 'react';
import { useAuthState } from '../contexts/states/auth-state';
import { useInputValue } from '../hooks/use-input-value';
import api from '../api/client';
import { Redirect } from 'react-router-dom';

function Login() {
  const [{ member }, dispatch] = useAuthState();
  const [authAttempted, setAuthAttempted] = useState();
  const email = useInputValue('');
  const password = useInputValue('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthAttempted(true);
    try {
      const auth = await api.login(email.value, password.value);
      dispatch({ type: 'LOGIN', auth });
    } catch (error) {
      console.log(error);
      alert('Invalid');
    }
    setAuthAttempted(false);
  };

  return member ? (
    <Redirect to="/row" />
  ) : authAttempted ? (
    <div>Logging in</div>
  ) : (
    <form className="login" onSubmit={handleSubmit}>
      <div className="group">
        <label htmlFor="email">Email</label>
        <input name="email" placeholder="Email" {...email}></input>
      </div>
      <div className="group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          {...password}
        ></input>
      </div>
      <div className="group forgot">
        <a href="/login">Forgot Password?</a>
      </div>
      <div className="group">
        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default Login;

import React, { useState } from 'react';
import { useAuthState } from '../contexts/states/auth-state';
import { useInputValue } from '../hooks/use-input-value';
import api from '../api/client';
import { Redirect } from 'react-router-dom';
import Loader from '../components/Loader';
import Button from '../components/Button';
import Input from '../components/Input';
import Form from '../components/Form';

function Login() {
  const [{ member }, dispatch] = useAuthState();
  const [authAttempted, setAuthAttempted] = useState(false);
  const email = useInputValue('');
  const password = useInputValue('');

  const handleSubmit = async (e) => {
    setAuthAttempted(true);
    try {
      await api.login(email.value, password.value);
      dispatch({ type: 'LOGIN' });
    } catch (e) {
      console.error(e);
      setAuthAttempted(false);
    }
  };

  return member ? (
    <Redirect to="/my-trips" />
  ) : authAttempted ? (
    <Loader />
  ) : (
    <div className="m-auto max-w-md">
      <Form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            label="Email"
            name="email"
            placeholder="Email"
            required
            {...email}
          />
        </div>
        <div className="mb-6">
          <Input
            label="Password"
            name="password"
            placeholder="Password"
            type="password"
            required
            {...password}
          />
        </div>
        <div className="flex items-center justify-between">
          <Button kind="confirm" type="submit">
            Sign In
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;

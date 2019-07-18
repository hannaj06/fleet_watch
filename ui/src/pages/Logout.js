import React, { useEffect } from 'react';
import api from '../api/client';
import { useAuthState } from '../contexts/states/auth-state';

function Logout() {
  const [, dispatch] = useAuthState();

  useEffect(() => {
    console.info('Logging out');
    const logout = async () => {
      try {
        await api.logout();
        dispatch({ type: 'LOGOUT' });
      } catch {}
    };
    logout();
  }, [dispatch]);

  return <></>;
}

export default Logout;

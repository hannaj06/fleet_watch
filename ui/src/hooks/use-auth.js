import { useAuthState } from '../contexts/states/auth-state';
import { useEffect } from 'react';
import api, { coordinator } from '../api/client';

function configureOrbit(token) {
  const header = `Bearer ${token}`;
  const remote = coordinator.sources.find((source) => source.name === 'remote');
  if (remote) {
    remote.defaultFetchSettings.headers = {
      Authorization: header,
    };
  }
}

const useAuth = () => {
  const [state, dispatch] = useAuthState();
  const { auth = {} } = state;
  const { token } = auth;

  useEffect(() => {
    console.info('Restoring token from local storage');
    let existingToken = localStorage.fleetwatchtoken;
    dispatch({
      type: 'SET_TOKEN',
      auth: { token: existingToken },
    });
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      console.info('Attempting Login');
      configureOrbit(token);
      const fetchUser = async () => {
        try {
          console.log('Fetching current member');
          const member = await api.getMember();
          dispatch({ type: 'LOAD_MEMBER', member });
        } catch {
          dispatch({ type: 'LOG_OUT' });
        }
      };
      fetchUser();
    }
  }, [token, dispatch]);

  return state;
};

export default useAuth;

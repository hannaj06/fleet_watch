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
  const { token, member } = auth;

  useEffect(() => {
    let existingToken = localStorage.fleetwatchtoken;
    if (existingToken) {
      console.info('Restoring token from local storage');
      dispatch({
        type: 'SET_TOKEN',
        auth: { token: existingToken },
      });
      dispatch({
        type: 'AUTH',
        isLoading: true,
      });
      configureOrbit(existingToken);
      const fetchUser = async () => {
        try {
          console.info('Fetching current member');
          const member = await api.getMember();
          dispatch({ type: 'LOAD_MEMBER', member });
        } catch {
          dispatch({ type: 'LOGOUT' });
        }
      };
      if (!member) fetchUser();
    } else {
      dispatch({ type: 'AUTH', isLoading: false });
    }
  }, [token, member, dispatch]);

  return state;
};

export default useAuth;

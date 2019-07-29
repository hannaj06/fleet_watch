import { useEffect } from 'react';
import config from '../config';
import { useAuthState } from '../contexts/states/auth-state';
import api, { coordinator } from '../api/client';

const { tokenKey } = config;

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
    const existingToken = localStorage[tokenKey];
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
          const data = await api.getMember();
          const id = data.relationships.member.data.id;
          const user = await api.findRecord('member', id);
          dispatch({ type: 'LOAD_MEMBER', member: user });
        } catch (e) {
          console.error(e);
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

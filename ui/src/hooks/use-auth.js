import { useEffect } from 'react';
import { useAuthState } from '../contexts/states/auth-state';
import api from '../api/client';

const useAuth = () => {
  const [state, dispatch] = useAuthState();
  const { member, isLoggedIn } = state;

  useEffect(() => {
    if (document.cookie) {
      const fetchUser = async () => {
        try {
          console.info('Fetching current member');
          const data = await api.getSession();
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
      dispatch({ type: 'LOGOUT' });
    }
  }, [isLoggedIn, member, dispatch]);

  return state;
};

export default useAuth;

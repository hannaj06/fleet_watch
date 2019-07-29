import config from '../../config';

const { tokenKey } = config;

const initialState = { auth: { token: null }, member: null, isLoading: true };

const authStateReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      localStorage.setItem(tokenKey, action.auth.token);
      return { ...state, auth: action.auth };
    }
    case 'AUTH': {
      return { ...state, isLoading: action.isLoading };
    }
    case 'LOGOUT': {
      localStorage.removeItem(tokenKey);
      return {
        ...state,
        auth: { token: null },
        member: null,
        isLoading: false,
      };
    }
    case 'SET_TOKEN': {
      return { ...state, auth: action.auth };
    }
    case 'LOAD_MEMBER': {
      return { ...state, member: action.member, isLoading: false };
    }
    default:
      return state;
  }
};

export { initialState };
export default authStateReducer;

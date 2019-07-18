const initialState = { auth: { token: null }, member: null };

const authStateReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      localStorage.setItem('fleetwatchtoken', action.auth.token);
      return { ...state, auth: action.auth };
    }
    case 'LOGOUT': {
      localStorage.removeItem('fleetwatchtoken');
      return { ...state, auth: { token: null }, member: null };
    }
    case 'SET_TOKEN': {
      return { ...state, auth: action.auth };
    }
    case 'LOAD_MEMBER': {
      return { ...state, member: action.member };
    }
    default:
      return state;
  }
};

export { initialState };
export default authStateReducer;

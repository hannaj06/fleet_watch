const initialState = { member: null, isLoading: true, isLoggedIn: false };

const authStateReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return { ...state, isLoggedIn: true };
    }
    case 'LOGOUT': {
      return {
        ...state,
        member: null,
        isLoading: false,
        isLoggedIn: false,
      };
    }
    case 'LOAD_MEMBER': {
      return {
        ...state,
        member: action.member,
        isLoading: false,
        isLoggedIn: true,
      };
    }
    default:
      return state;
  }
};

export { initialState };
export default authStateReducer;

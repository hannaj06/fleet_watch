import auth from './auth';

async function login(email, password) {
  if (email === 'invalid') {
    return await auth.authenticate(false);
  }
  return await auth.authenticate();
}

async function logout() {
  return await auth.unauthenticate();
}

const server = {
  login,
  logout,
};

export default server;
export { login, logout };

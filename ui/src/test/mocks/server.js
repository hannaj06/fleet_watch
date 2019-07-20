import auth from './auth';

async function login(email, password) {
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

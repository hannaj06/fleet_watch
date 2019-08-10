import { clearCookies } from '../../utils';

const fakeAuth = {
  authenticate(valid = true) {
    return new Promise((resolve, reject) => {
      return setTimeout(() => {
        if (valid) {
          document.cookie = 'foo=bar;';
          return resolve({});
        } else {
          return reject({});
        }
      }, 200);
    });
  },
  unauthenticate() {
    return new Promise((resolve, reject) => {
      return setTimeout(() => {
        clearCookies();
        resolve();
      }, 200);
    });
  },
};

export default fakeAuth;

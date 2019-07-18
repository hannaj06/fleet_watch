const fakeAuth = {
  authenticate(valid = true) {
    return new Promise((resolve, reject) => {
      return setTimeout(() => {
        if (valid) {
          return resolve({ token: 'abc-123' });
        } else {
          return reject({});
        }
      }, 200);
    });
  },
  unauthenticate() {
    return new Promise((resolve, reject) => {
      return setTimeout(() => {
        resolve();
      }, 200);
    });
  },
};

export default fakeAuth;

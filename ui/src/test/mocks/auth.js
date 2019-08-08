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
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf('=');
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
        resolve();
      }, 200);
    });
  },
};

export default fakeAuth;

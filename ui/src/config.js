const prod = {
  API_ROOT: '',
};

const dev = {
  API_ROOT: 'http://localhost:5000/api',
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;

config.tokenKey = 'fleetwatchtoken';

export default config;

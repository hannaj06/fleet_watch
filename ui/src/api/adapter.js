import axios from 'axios';
import config from '../config';

const { API_ROOT } = config;

const instance = axios.create({
  baseURL: API_ROOT,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.fleetwatchtoken;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const adapter = {
  get(url, params = {}) {
    return instance.get(url, params);
  },
  post(url, params = {}) {
    return instance.post(url, params);
  },
  patch(url, params = {}) {
    return instance.patch(url, params);
  },
  put(url, params = {}) {
    return instance.put(url, params);
  },
  delete(url, params = {}) {
    return instance.delete(url, params);
  },
};

export { API_ROOT };

export default adapter;

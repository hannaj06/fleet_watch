import axios from 'axios';
import config from '../config';

const { API_ROOT } = config;

const instance = axios.create({
  baseURL: API_ROOT,
  withCredentials: true,
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

export default adapter;

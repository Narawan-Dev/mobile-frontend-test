import axios from 'axios';

import { ENV } from '../../config/env';
import * as secureAuth from '../storage/secureAuth';
import { store } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { isTokenExpired } from '../../utils/auth';

console.log('ENV.API_BASE_URL:', ENV.API_BASE_URL);

export const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async config => {
    const token = await secureAuth.getToken();

    if (token && isTokenExpired(token)) {
      await secureAuth.clearToken();
      store.dispatch(logout());
      throw new Error('SESSION_EXPIRED');
    }

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const status = error?.response?.status;

    if (status === 401) {
      try {
        await secureAuth.clearToken();
      } finally {
        store.dispatch(logout());
      }
    }

    return Promise.reject(error);
  },
);
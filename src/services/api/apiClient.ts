import axios from 'axios';

import { ENV } from '../../config/env';
import * as secureAuth from '../storage/secureAuth';
import { store } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { isTokenExpired } from '../../utils/auth';
import { resetToSignIn } from '../../navigation/RootNavigation';

export const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isLoggingOut = false;

const forceLogout = async () => {
  if (isLoggingOut) return;

  isLoggingOut = true;

  try {
    await secureAuth.clearAuth();
    store.dispatch(logout());
    resetToSignIn();
  } finally {
    isLoggingOut = false;
  }
};

apiClient.interceptors.request.use(
  async config => {
    const token = await secureAuth.getToken();

    if (!token) {
      return config;
    }

    if (isTokenExpired(token)) {
      await forceLogout();

      return Promise.reject({
        code: 'SESSION_EXPIRED',
        message: 'Session expired. Please sign in again.',
      });
    }

    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const status = error?.response?.status;

    if (status === 401) {
      await forceLogout();

      return Promise.reject({
        code: 'SESSION_EXPIRED',
        message: 'Session expired. Please sign in again.',
      });
    }

    return Promise.reject(error);
  },
);
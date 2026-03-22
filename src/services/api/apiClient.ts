import axios from 'axios';
import { ENV } from '../../config/env';

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
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);
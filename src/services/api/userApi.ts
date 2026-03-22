import { apiClient } from './apiClient';

export const userApi = {
  async getProfile(token: string) {
    const response = await apiClient.get('/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  },

  async getTransactions(token: string) {
    const response = await apiClient.get('/user/transactions', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  },

  async withdraw(token: string, amount: string) {
    const response = await apiClient.post(
      '/user/withdraw',
      { amount },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return response.data;
  },
};

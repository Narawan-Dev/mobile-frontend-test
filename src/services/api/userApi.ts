import { apiClient } from './apiClient';
import {
  UserProfileResponse,
  TransactionResponse,
  CommonResponse,
} from './types';

export const userApi = {
  async getProfile(token: string): Promise<UserProfileResponse> {
    const response = await apiClient.get<UserProfileResponse>('/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  },

  async getTransactions(token: string): Promise<TransactionResponse> {
    const response = await apiClient.get<TransactionResponse>(
      '/user/transactions',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data;
  },

  async withdraw(
    token: string,
    amount: string,
  ): Promise<CommonResponse> {
    const response = await apiClient.post<CommonResponse>(
      '/user/withdraw',
      { amount },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data;
  },
};
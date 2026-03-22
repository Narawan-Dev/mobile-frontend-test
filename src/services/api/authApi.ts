import { apiClient } from './apiClient';
import { SignInRequest, SignInResponse } from '../../types/auth';

export const authApi = {
  async signIn(payload: SignInRequest): Promise<SignInResponse> {
    try {
      console.log('AUTH API - signIn payload:', payload);

      const response = await apiClient.post<SignInResponse>('/signin', payload);

      return response.data;
    } catch (error: any) {
      console.log('AUTH API - signIn error:', error);

      throw error;
    }
  },
};
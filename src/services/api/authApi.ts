import { apiClient } from './apiClient';
import { SignInRequest, SignInResponse } from '../../types/auth';

export const authApi = {
  async signIn(payload: SignInRequest): Promise<SignInResponse> {
    try {
      console.log('AUTH API - signIn payload:', payload);

      const response = await apiClient.post<SignInResponse>('/signin', payload);

      console.log('AUTH API - signIn response status:', response.status);
      console.log('AUTH API - signIn response data:', response.data);

      return response.data;
    } catch (error: any) {
      console.log('AUTH API - signIn error:', error);
      console.log('AUTH API - signIn error message:', error?.message);
      console.log('AUTH API - signIn error response:', error?.response?.data);
      console.log('AUTH API - signIn error status:', error?.response?.status);

      throw error;
    }
  },
};
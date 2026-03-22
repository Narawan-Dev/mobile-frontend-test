import { AppDispatch } from '../index';
import { authApi } from '../../services/api/authApi';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../slices/authSlice';

type SignInThunkResult = {
  success: boolean;
  message?: string;
};

export const signInWithPhone = (phone: string) => {
  return async (dispatch: AppDispatch): Promise<SignInThunkResult> => {
    try {
      dispatch(signInStart());

      const response = await authApi.signIn({ phone });
      const { token } = response.data;

      dispatch(signInSuccess({ token, phone }));

      return { success: true };
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'ไม่สามารถเข้าสู่ระบบได้';

      dispatch(signInFailure(message));

      return {
        success: false,
        message,
      };
    }
  };
};
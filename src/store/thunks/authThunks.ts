import { AppDispatch } from '../index';
import { authApi } from '../../services/api/authApi';
import { sendOtpMock } from '../../services/api/authMock';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../slices/authSlice';

type SignInThunkResult = {
  success: boolean;
  message?: string;
};

// This thunk calls the real /signin API (server-side verification).
export const signInWithPhone = (phone: string, otp?: string) => {
  return async (dispatch: AppDispatch): Promise<SignInThunkResult> => {
    try {
      dispatch(signInStart());

      const response = await authApi.signIn({ phone, otp });
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

// This thunk simulates sending OTP via a mock service (success/fail paths).
export const requestOtp = (phone: string) => {
  return async (dispatch: AppDispatch): Promise<SignInThunkResult> => {
    try {
      dispatch(signInStart());

      await sendOtpMock(phone);

      // do not set token yet; just indicate success
      return { success: true };
    } catch (error: any) {
      const message = error?.message || 'ไม่สามารถส่ง OTP ได้';
      dispatch(signInFailure(message));
      return { success: false, message };
    }
  };
};
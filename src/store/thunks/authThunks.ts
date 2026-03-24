import { AppDispatch } from '../index';
import { authApi } from '../../services/api/authApi';
import { sendOtpMock } from '../../services/api/otpMockApi';
import {
  signInFailure,
  signInStart,
  signInSuccess,
  hydrateAuthState,
  setPasscodeVerified,
  setHasPin,
  otpRequestSuccess,
} from '../slices/authSlice';
import * as secureAuth from '../../services/storage/secureAuth';
import { isTokenExpired } from '../../utils/auth';

type SignInThunkResult = {
  success: boolean;
  message?: string;
};

export const signInWithPhone = (phone: string, otp?: string) => {
  return async (dispatch: AppDispatch): Promise<SignInThunkResult> => {
    try {
      dispatch(signInStart());

      const response = await authApi.signIn({ phone, otp });
      const { token } = response.data;

      await secureAuth.saveToken(token);
      await secureAuth.savePhone(phone);

      const passcode = await secureAuth.getPasscode(phone);
      const hasPin = !!passcode;

      dispatch(signInSuccess({ phone }));
      dispatch(setHasPin(hasPin));
      dispatch(setPasscodeVerified(hasPin));

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

export const requestOtp = (phone: string) => {
  return async (dispatch: AppDispatch): Promise<SignInThunkResult> => {
    try {
      dispatch(signInStart());

      await sendOtpMock(phone);

      dispatch(otpRequestSuccess());

      return { success: true };
    } catch (error: any) {
      const message = error?.message || 'ไม่สามารถส่ง OTP ได้';
      dispatch(signInFailure(message));
      return { success: false, message };
    }
  };
};

export const hydrateAuthFromStorage = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      const token = await secureAuth.getToken();
      const phone = await secureAuth.getPhone();

      const passcode = phone ? await secureAuth.getPasscode(phone) : null;

      const hasPin = !!passcode;
      const validToken = !!token && !isTokenExpired(token);

      if (token && !validToken) {
        await secureAuth.clearToken();
        await secureAuth.clearPhone();
      }

      dispatch(
        hydrateAuthState({
          phone: validToken ? phone : null,
          isAuthenticated: validToken,
          hasPin,
        }),
      );

      dispatch(setPasscodeVerified(false));
    } catch (error) {
      let phone: string | null = null;
      let hasPin = false;

      try {
        phone = await secureAuth.getPhone();

        if (phone) {
          const passcode = await secureAuth.getPasscode(phone);
          hasPin = !!passcode;
        }
      } catch {}

      dispatch(
        hydrateAuthState({
          phone: null,
          isAuthenticated: false,
          hasPin,
        }),
      );

      dispatch(setPasscodeVerified(false));
    }
  };
};
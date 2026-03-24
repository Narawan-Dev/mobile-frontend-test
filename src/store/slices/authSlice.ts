import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PasscodeMode = 'create' | 'enter' | 'reset' | null;

export type AuthState = {
  phone: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  loading: boolean;
  error: string | null;
  isPasscodeVerified: boolean;
  availableBalance: number | null;
  hasPin: boolean;
  passcodeMode: PasscodeMode;
};

const initialState: AuthState = {
  phone: null,
  isAuthenticated: false,
  isHydrated: true,
  loading: false,
  error: null,
  isPasscodeVerified: false,
  availableBalance: null,
  hasPin: false,
  passcodeMode: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInStart: state => {
      state.loading = true;
      state.error = null;
    },

    signInSuccess: (
      state,
      action: PayloadAction<{
        phone: string;
        hasPin?: boolean;
      }>,
    ) => {
      state.loading = false;
      state.phone = action.payload.phone;
      state.isAuthenticated = true;
      state.error = null;
      state.hasPin = action.payload.hasPin ?? state.hasPin;
      state.isPasscodeVerified = false;
      state.passcodeMode = null;
    },

    otpRequestSuccess: state => {
      state.loading = false;
      state.error = null;
    },

    signInFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    setPhone: (state, action: PayloadAction<string | null>) => {
      state.phone = action.payload;
    },

    setHasPin: (state, action: PayloadAction<boolean>) => {
      state.hasPin = action.payload;
    },

    setPasscodeVerified: (state, action: PayloadAction<boolean>) => {
      state.isPasscodeVerified = action.payload;
    },

    setPasscodeMode: (state, action: PayloadAction<PasscodeMode>) => {
      state.passcodeMode = action.payload;
    },

    setAvailableBalance: (state, action: PayloadAction<number | null>) => {
      state.availableBalance = action.payload;
    },

    hydrateAuthState: (
      state,
      action: PayloadAction<{
        phone: string | null;
        isAuthenticated: boolean;
        hasPin: boolean;
      }>,
    ) => {
      state.phone = action.payload.phone;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.hasPin = action.payload.hasPin;
      state.isPasscodeVerified = false;
      state.isHydrated = true;
      state.passcodeMode = null;
      state.loading = false;
      state.error = null;
    },

    logout: state => {
      state.phone = null;
      state.isAuthenticated = false;
      state.isHydrated = true;
      state.loading = false;
      state.error = null;
      state.isPasscodeVerified = false;
      state.availableBalance = null;
      state.hasPin = false;
      state.passcodeMode = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  otpRequestSuccess,
  signInFailure,
  setPhone,
  setHasPin,
  setPasscodeVerified,
  setPasscodeMode,
  setAvailableBalance,
  hydrateAuthState,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
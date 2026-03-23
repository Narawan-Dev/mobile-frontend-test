import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  phone: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  loading: boolean;
  error: string | null;
  hasPin: boolean;
  isPasscodeVerified: boolean;
  availableBalance: number | null;
};

const initialState: AuthState = {
  phone: null,
  isAuthenticated: false,
  isHydrated: false,
  loading: false,
  error: null,
  hasPin: false,
  isPasscodeVerified: false,
  availableBalance: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInStart: state => {
      state.loading = true;
      state.error = null;
    },

    signInSuccess: (state, action: PayloadAction<{ phone: string }>) => {
      state.loading = false;
      state.phone = action.payload.phone;
      state.isAuthenticated = true;
      state.error = null;
    },

    signInFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    otpRequestSuccess: state => {
      state.loading = false;
      state.error = null;
    },

    hydrateAuth: (
      state,
      action: PayloadAction<{
        phone: string | null;
        isAuthenticated: boolean;
        hasPin?: boolean;
      }>,
    ) => {
      state.phone = action.payload.phone;
      state.hasPin = action.payload.hasPin ?? false;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.isHydrated = true;
      state.loading = false;
      state.error = null;
    },

    setHasPin: (state, action: PayloadAction<boolean>) => {
      state.hasPin = action.payload;
    },

    setPasscodeVerified: (state, action: PayloadAction<boolean>) => {
      state.isPasscodeVerified = action.payload;
    },

    clearAuthError: state => {
      state.error = null;
    },

    setAvailableBalance: (state, action: PayloadAction<number | null>) => {
      state.availableBalance = action.payload;
    },

    logout: state => {
      state.phone = null;
      state.isAuthenticated = false;
      state.isHydrated = true;
      state.loading = false;
      state.error = null;
      state.isPasscodeVerified = false;
      state.availableBalance = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  otpRequestSuccess,
  hydrateAuth,
  setHasPin,
  setPasscodeVerified,
  clearAuthError,
  setAvailableBalance,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
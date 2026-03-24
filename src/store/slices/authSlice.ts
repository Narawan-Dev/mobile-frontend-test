import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  phone: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  loading: boolean;
  error: string | null;
  isPasscodeVerified: boolean;
  availableBalance: number | null;
  hasPin: boolean;
};

const initialState: AuthState = {
  phone: null,
  isAuthenticated: false,
  isHydrated: false,
  loading: false,
  error: null,
  isPasscodeVerified: false,
  availableBalance: null,
  hasPin: false,
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
        hasPin: boolean;
      }>,
    ) => {
      state.phone = action.payload.phone;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.hasPin = action.payload.hasPin;
      state.isHydrated = true;
      state.loading = false;
      state.error = null;
    },

    setPasscodeVerified: (state, action: PayloadAction<boolean>) => {
      state.isPasscodeVerified = action.payload;
    },
    
    setHasPin: (state, action: PayloadAction<boolean>) => {
      state.hasPin = action.payload;
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
      state.hasPin = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  otpRequestSuccess,
  hydrateAuth,
  setPasscodeVerified,
  setHasPin,
  clearAuthError,
  setAvailableBalance,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
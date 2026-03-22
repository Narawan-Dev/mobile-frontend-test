import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  token: string | null;
  phone: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  loading: boolean;
  error: string | null;
  hasPin: boolean;
};

const initialState: AuthState = {
  token: null,
  phone: null,
  isAuthenticated: false,
  isHydrated: true,
  loading: false,
  error: null,
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

    signInSuccess: (
      state,
      action: PayloadAction<{ token: string; phone: string }>,
    ) => {
      state.loading = false;
      state.token = action.payload.token;
      state.phone = action.payload.phone;
      state.isAuthenticated = true;
      state.error = null;
    },

    signInFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    hydrateAuth: (
      state,
      action: PayloadAction<{
        token: string | null;
        phone: string | null;
        hasPin?: boolean;
      }>,
    ) => {
      state.token = action.payload.token;
      state.phone = action.payload.phone;
      state.hasPin = action.payload.hasPin ?? false;
      state.isAuthenticated = !!action.payload.token;
      state.isHydrated = true;
      state.loading = false;
      state.error = null;
    },

    setHasPin: (state, action: PayloadAction<boolean>) => {
      state.hasPin = action.payload;
    },

    clearAuthError: state => {
      state.error = null;
    },

    logout: state => {
      state.token = null;
      state.phone = null;
      state.isAuthenticated = false;
      state.isHydrated = true;
      state.loading = false;
      state.error = null;
      state.hasPin = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  hydrateAuth,
  setHasPin,
  clearAuthError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  token: string | null;
  phone: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  token: null,
  phone: null,
  isAuthenticated: false,
  isHydrated: true,
  loading: false,
  error: null,
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
      }>,
    ) => {
      state.token = action.payload.token;
      state.phone = action.payload.phone;
      state.isAuthenticated = !!action.payload.token;
      state.isHydrated = true;
      state.loading = false;
      state.error = null;
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
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  hydrateAuth,
  clearAuthError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
export type SignInRequest = {
  phone: string;
  otp?: string;
};

export type SignInResponse = {
  data: {
    phone: string;
    token: string;
  };
};

export type AuthState = {
  token: string | null;
  phone: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  loading: boolean;
  error: string | null;
};
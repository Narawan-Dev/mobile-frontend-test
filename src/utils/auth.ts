import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  exp?: number;
};

export const isTokenExpired = (token: string | null) => {
  if (!token) return true;

  try {
    const payload = jwtDecode<JwtPayload>(token);

    if (!payload.exp) return true;

    const now = Math.floor(Date.now() / 1000);

    return payload.exp <= now;
  } catch {
    return true;
  }
};
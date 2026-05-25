export interface AuthUser {
  email: string;
  isAdmin: boolean;
  token?: string;
}

export interface AuthState {
  isAdmin: boolean;
  email: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: AuthUser;
}

export interface AuthUser {
  email: string;
  isAdmin: boolean;
}

export interface AuthState {
  isAdmin: boolean;
  email: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: AuthUser;
}

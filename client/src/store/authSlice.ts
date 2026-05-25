import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, AuthUser } from '../types/auth.types';

const initialState: AuthState = {
  isAdmin: false,
  email: null,
  token: localStorage.getItem('admin_token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state: AuthState, action: PayloadAction<AuthUser>) => {
      state.isAdmin = action.payload.isAdmin;
      state.email = action.payload.email;
      state.error = null;
      if (action.payload.token) {
        state.token = action.payload.token;
        localStorage.setItem('admin_token', action.payload.token);
      }
    },
    logOutState: (state: AuthState) => {
      state.isAdmin = false;
      state.email = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('admin_token');
    },
    setAuthLoading: (state: AuthState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAuthError: (state: AuthState, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCredentials, logOutState, setAuthLoading, setAuthError } = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentAdmin = (state: any) => state.auth.isAdmin;
export const selectAdminEmail = (state: any) => state.auth.email;
export const selectAuthLoading = (state: any) => state.auth.loading;
export const selectAuthToken = (state: any) => state.auth.token;


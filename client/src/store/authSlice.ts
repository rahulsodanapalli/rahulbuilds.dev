import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, AuthUser } from '../types/auth.types';

const initialState: AuthState = {
  isAdmin: false,
  email: null,
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
    },
    logOutState: (state: AuthState) => {
      state.isAdmin = false;
      state.email = null;
      state.error = null;
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

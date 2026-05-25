import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const createBaseQuery = () =>
  fetchBaseQuery({
    baseUrl: `${API_URL}/api`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    fetchFn: (input, init) => fetch(input, { ...init, cache: 'no-store' }),
  });

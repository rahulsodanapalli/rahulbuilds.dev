import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { authApi } from '../services/api/authApi';
import { skillsApi } from '../services/api/skillsApi';
import { experienceApi } from '../services/api/experienceApi';
import { projectsApi } from '../services/api/projectsApi';
import { achievementsApi } from '../services/api/achievementsApi';
import { contactApi } from '../services/api/contactApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [skillsApi.reducerPath]: skillsApi.reducer,
    [experienceApi.reducerPath]: experienceApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [achievementsApi.reducerPath]: achievementsApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      skillsApi.middleware,
      experienceApi.middleware,
      projectsApi.middleware,
      achievementsApi.middleware,
      contactApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

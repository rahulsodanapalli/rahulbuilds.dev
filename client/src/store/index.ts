import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { authApi } from '../api/authApi';
import { skillsApi } from '../api/skillsApi';
import { experienceApi } from '../api/experienceApi';
import { projectsApi } from '../api/projectsApi';
import { achievementsApi } from '../api/achievementsApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [skillsApi.reducerPath]: skillsApi.reducer,
    [experienceApi.reducerPath]: experienceApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [achievementsApi.reducerPath]: achievementsApi.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      skillsApi.middleware,
      experienceApi.middleware,
      projectsApi.middleware,
      achievementsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

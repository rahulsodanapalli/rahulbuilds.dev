import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AchievementItem } from '../types/project.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const achievementsApi = createApi({
  reducerPath: 'achievementsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
  }),
  tagTypes: ['Achievements'],
  endpoints: (builder) => ({
    getAchievements: builder.query<AchievementItem[], void>({
      query: () => '/achievements',
      transformResponse: (response: { success: boolean; data: AchievementItem[] }) => response.data,
      providesTags: ['Achievements'],
    }),
    createAchievement: builder.mutation<AchievementItem, Partial<AchievementItem>>({
      query: (achievement) => ({
        url: '/achievements',
        method: 'POST',
        body: achievement,
      }),
      invalidatesTags: ['Achievements'],
    }),
    updateAchievement: builder.mutation<AchievementItem, { id: string; achievement: Partial<AchievementItem> }>({
      query: ({ id, achievement }) => ({
        url: `/achievements/${id}`,
        method: 'PUT',
        body: achievement,
      }),
      invalidatesTags: ['Achievements'],
    }),
    deleteAchievement: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/achievements/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Achievements'],
    }),
  }),
});

export const {
  useGetAchievementsQuery,
  useCreateAchievementMutation,
  useUpdateAchievementMutation,
  useDeleteAchievementMutation,
} = achievementsApi;

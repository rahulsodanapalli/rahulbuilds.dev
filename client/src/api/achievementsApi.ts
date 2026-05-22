import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AchievementItem } from '../types/project.types';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const achievementsApi = createApi({
  reducerPath: 'achievementsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api`,
    credentials: 'include',
  }),
  tagTypes: ['Achievements'],

  endpoints: (builder) => ({
    getAchievements: builder.query<AchievementItem[], void>({
      query: () => '/achievements',
      transformResponse: (
        response: {
          success: boolean;
          data: AchievementItem[];
        }
      ) => response.data,
      providesTags: ['Achievements'],
    }),

    createAchievement: builder.mutation({
      query: (achievement) => ({
        url: '/achievements',
        method: 'POST',
        body: achievement,
      }),
      invalidatesTags: ['Achievements'],
    }),

    updateAchievement: builder.mutation({
      query: ({ id, achievement }) => ({
        url: `/achievements/${id}`,
        method: 'PUT',
        body: achievement,
      }),
      invalidatesTags: ['Achievements'],
    }),

    deleteAchievement: builder.mutation({
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
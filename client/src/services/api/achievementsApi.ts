import { createApi } from '@reduxjs/toolkit/query/react';
import type { AchievementItem } from '../../types/project.types';
import { createBaseQuery } from './baseQuery';

export const achievementsApi = createApi({
  reducerPath: 'achievementsApi',
  baseQuery: createBaseQuery(),
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

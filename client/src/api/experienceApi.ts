import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ExperienceItem } from '../types/experience.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const experienceApi = createApi({
  reducerPath: 'experienceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api`,
    credentials: 'include',
  }),
  tagTypes: ['Experiences'],
  endpoints: (builder) => ({
    getExperiences: builder.query<ExperienceItem[], void>({
      query: () => '/experience',
      transformResponse: (response: { success: boolean; data: ExperienceItem[] }) => response.data,
      providesTags: ['Experiences'],
    }),
    createExperience: builder.mutation<ExperienceItem, Partial<ExperienceItem>>({
      query: (exp) => ({
        url: '/experience',
        method: 'POST',
        body: exp,
      }),
      invalidatesTags: ['Experiences'],
    }),
    updateExperience: builder.mutation<ExperienceItem, { id: string; exp: Partial<ExperienceItem> }>({
      query: ({ id, exp }) => ({
        url: `/experience/${id}`,
        method: 'PUT',
        body: exp,
      }),
      invalidatesTags: ['Experiences'],
    }),
    deleteExperience: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/experience/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Experiences'],
    }),
  }),
});

export const {
  useGetExperiencesQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApi;

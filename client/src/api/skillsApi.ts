import { createApi } from '@reduxjs/toolkit/query/react';
import type { SkillItem } from '../types/skill.types';
import { createBaseQuery } from './baseQuery';

export const skillsApi = createApi({
  reducerPath: 'skillsApi',
  baseQuery: createBaseQuery(),
  tagTypes: ['Skills'],
  endpoints: (builder) => ({
    getSkills: builder.query<SkillItem[], void>({
      query: () => '/skills',
      transformResponse: (response: { success: boolean; data: SkillItem[] }) => response.data,
      providesTags: ['Skills'],
    }),
    createSkill: builder.mutation<SkillItem, Partial<SkillItem>>({
      query: (skill) => ({
        url: '/skills',
        method: 'POST',
        body: skill,
      }),
      invalidatesTags: ['Skills'],
    }),
    updateSkill: builder.mutation<SkillItem, { id: string; skill: Partial<SkillItem> }>({
      query: ({ id, skill }) => ({
        url: `/skills/${id}`,
        method: 'PUT',
        body: skill,
      }),
      invalidatesTags: ['Skills'],
    }),
    deleteSkill: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/skills/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Skills'],
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = skillsApi;

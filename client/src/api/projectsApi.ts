import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ProjectItem } from '../types/project.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api`,
    credentials: 'include',
  }),
  tagTypes: ['Projects'],
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectItem[], void>({
      query: () => '/projects',
      transformResponse: (response: { success: boolean; data: ProjectItem[] }) => response.data,
      providesTags: ['Projects'],
    }),
    createProject: builder.mutation<ProjectItem, Partial<ProjectItem>>({
      query: (project) => ({
        url: '/projects',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Projects'],
    }),
    updateProject: builder.mutation<ProjectItem, { id: string; project: Partial<ProjectItem> }>({
      query: ({ id, project }) => ({
        url: `/projects/${id}`,
        method: 'PUT',
        body: project,
      }),
      invalidatesTags: ['Projects'],
    }),
    deleteProject: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Projects'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;

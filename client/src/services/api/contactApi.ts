import { createApi } from '@reduxjs/toolkit/query/react';
import type { MessageItem } from '../../types/message.types';
import { createBaseQuery } from './baseQuery';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: createBaseQuery(),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getContactMessages: builder.query<MessageItem[], void>({
      query: () => '/contact',
      transformResponse: (response: { success: boolean; data: MessageItem[] }) => response.data,
      providesTags: ['Messages'],
    }),
    sendContactMessage: builder.mutation<{ success: boolean; data: any }, Partial<MessageItem>>({
      query: (messageDetails) => ({
        url: '/contact',
        method: 'POST',
        body: messageDetails,
      }),
      invalidatesTags: ['Messages'],
    }),
    deleteContactMessage: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/contact/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

export const {
  useGetContactMessagesQuery,
  useSendContactMessageMutation,
  useDeleteContactMessageMutation,
} = contactApi;

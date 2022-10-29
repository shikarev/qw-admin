import { createApi } from '@reduxjs/toolkit/query/react';
import api from '../utils/api';

export const userApi = createApi({
  reducerPath: 'user',
  tagTypes: ['user'],
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    getUserInfo: builder.query<any, void>({
      query: () => ({
        url: `user/info`
      })
    })
  })
});

export const {
  useGetUserInfoQuery
} = userApi;

import { apiBase } from './apiBase';

const apiAuth = apiBase.injectEndpoints({
  endpoints: build => ({
    getUser: build.query({
      query: () => '/users/me/',
      providesTags: ['me'],
    }),
    login: build.mutation({
      query: data => ({
        url: '/users/login/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useGetUserQuery } = apiAuth;

export default apiAuth;

import { apiBase } from './apiBase';

const apiUsers = apiBase.injectEndpoints({
  endpoints: build => ({
    getAllUsers: build.query({
      query: () => '/users/?include_all=true',
      providesTags: ['all-users'],
    }),
    createUser: build.mutation({
      query: data => ({
        url: '/users/register/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['all-users'],
    }),
    updateUser: build.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['all-users'],
    }),
    deleteUser: build.mutation({
      query: id => ({
        url: `/users/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['all-users'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = apiUsers;

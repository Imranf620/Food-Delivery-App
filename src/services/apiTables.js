import { apiBase } from './apiBase';

const apiTables = apiBase.injectEndpoints({
  endpoints: build => ({
    // Get Tables
    getTables: build.query({
      query: () => '/tables/?include_all=true',
      providesTags: ['tables'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetTablesQuery } = apiTables;

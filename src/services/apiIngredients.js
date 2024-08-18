import { apiBase } from './apiBase';

const apiIngredients = apiBase.injectEndpoints({
  endpoints: build => ({
    // Get Ingredients
    getIngredients: build.query({
      query: (page = 1) =>
        `/ingredients/?${page === 'all' ? 'include_all=true' : `page=${page}`}`,
      providesTags: ['ingredients'],
    }),

    // Create ingredient
    createIngredient: build.mutation({
      query: data => ({ url: '/ingredients/', method: 'POST', body: data }),
      invalidatesTags: ['ingredients'],
    }),

    // Update ingredient
    updateIngredient: build.mutation({
      query({ id, ...data }) {
        return {
          url: `/ingredients/${id}/`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['ingredients'],
    }),

    // Delete ingredient
    deleteIngredient: build.mutation({
      query: id => ({ url: `/ingredients/${id}/`, method: 'DELETE' }),
      invalidatesTags: ['ingredients'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetIngredientsQuery,
  useCreateIngredientMutation,
  useUpdateIngredientMutation,
  useDeleteIngredientMutation,
  usePrefetch,
} = apiIngredients;

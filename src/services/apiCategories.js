// Ensure you use the correct import for RTK Query
import { apiBase } from './apiBase'; // Ensure this is correctly configured and exported

// Inject endpoints into the base API
const apiCategories = apiBase.injectEndpoints({
  endpoints: build => ({
    // Get categories
    getCategories: build.query({
      query: () => '/categories/?include_all=true',
      providesTags: ['categories'],
    }),
    createCategory: build.mutation({
      query(body) {
        return {
          url: '/categories/',
          method: 'POST',
          body,
        };
      },

      invalidatesTags: ['categories'],
    }),

    // Update category
    updateCategory: build.mutation({
      query(data) {
        const { id, formData: body } = data;
        return {
          url: `/categories/${id}/`,
          method: 'PATCH',
          body,
        };
      },

      invalidatesTags: ['categories'],
    }),

    // Delete Category
    deleteCategory: build.mutation({
      query(id) {
        return {
          url: `/categories/${id}/`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['categories'],
    }),
  }),
  overrideExisting: false, // Prevents overriding existing endpoints if set to true
});

// Export hooks for usage in functional components
export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = apiCategories;

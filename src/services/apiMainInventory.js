import { apiBase } from './apiBase';

const apiMainInventory = apiBase.injectEndpoints({
  endpoints: build => ({
    // Get main inventory products
    getMainInventory: build.query({
      query: () => '/inventories/main/?include_all=true',
      providesTags: ['main-inventory'],
    }),

    // Add stock to main inventory
    addItemToMainInventory: build.mutation({
      query: ({ id, data }) => ({
        url: `/inventories/main/add/${id}/?include_all=true`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['main-inventory'],
    }),

    // Update stock of main inventory
    updateItemOfMainInventory: build.mutation({
      query: ({ id, data }) => ({
        url: `inventories/main/${id}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['main-inventory'],
    }),

    // Send to kitchen
    sendToKitchen: build.mutation({
      query: data => ({
        url: `/inventories/main/transfer/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['main-inventory', 'kitchen-inventory'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMainInventoryQuery,
  useAddItemToMainInventoryMutation,
  useUpdateItemOfMainInventoryMutation,
  useSendToKitchenMutation,
} = apiMainInventory;

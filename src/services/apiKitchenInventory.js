import { apiBase } from './apiBase';

const apiKitchenInventory = apiBase.injectEndpoints({
  endpoints: build => ({
    // Get kitchen inventory stock
    getKitchenInventory: build.query({
      query: () => '/inventories/kitchen/?include_all=true',
      providesTags: ['kitchen-inventory'],
    }),

    // Send stock to main inventory
    sendToMain: build.mutation({
      query: data => ({
        url: `/inventories/kitchen/transfer/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['kitchen-inventory', 'main-inventory'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetKitchenInventoryQuery, useSendToMainMutation } =
  apiKitchenInventory;

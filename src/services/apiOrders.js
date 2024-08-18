import { apiBase } from './apiBase';

const apiOrders = apiBase.injectEndpoints({
  endpoints: build => ({
    // Get orders
    getOrders: build.query({
      query: (last = 7) =>
        `/orders/?include_cart=true&days_range=${last}&active_only=false`,
      providesTags: ['orders'],
    }),

    // Get order by id
    getOrderByID: build.mutation({
      query: id => `orders/${id}/?include_cart=true`,
    }),

    // Create order
    createOrder: build.mutation({
      query: data => ({
        url: '/orders/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['active-orders', 'tables'],
    }),

    // Get active orders
    getActiveOrders: build.query({
      query: () => '/orders/?include_cart=true&active_only=true',
      providesTags: ['active-orders'],
    }),

    // Update order
    updateOrder: build.mutation({
      query: ({ id, data }) => ({
        url: `/orders/${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['active-orders'],
    }),

    // Update order status
    updateOrderStatus: build.mutation({
      query: ({ id, data }) => ({
        url: `orders/${id}/?include_cart=false`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['active-orders', 'orders', 'tables'],
    }),

    // Get invoice
    getInvoice: build.mutation({
      query: id => ({
        url: `orders/${id}/invoice/?include_cart=true`,
        method: 'POST',
      }),
      invalidatesTags: ['active-orders', 'orders', 'tables'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetActiveOrdersQuery,
  useGetOrderByIDMutation,
  useUpdateOrderMutation,
  useUpdateOrderStatusMutation,
  useGetInvoiceMutation,
} = apiOrders;

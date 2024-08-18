import { apiBase } from './apiBase';

const apiCart = apiBase.injectEndpoints({
  endpoints: build => ({
    // Create cart function
    createCart: build.mutation({
      query: data => ({
        url: '/carts/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateCartMutation } = apiCart;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import { toast } from 'react-toastify';
import { getItem } from '../utils/localStorage';

let fetchError = false;

// Custom error handling function
const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: config.get('API_URL'),
    prepareHeaders: headers => {
      const isLogin = api.endpoint === 'login';
      const token = getItem('token');
      if (token && !isLogin) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    switch (result.error.status) {
      case 'FETCH_ERROR': {
        if (fetchError) return;
        toast.error(
          'Either Network Error or Something went wrong. Failed to Fetch the data!',
          { autoClose: 8000 },
        );
        fetchError = true;
        setTimeout(() => (fetchError = false), 6000);
        return {
          error: {
            message: 'Failed to fetch',
          },
        };
      }

      default: {
        const firstValue = Object.keys(result?.error?.data)[0];
        // Show error
        if (Array.isArray(result.error.data[firstValue])) {
          let message = '';
          console.log(message);
          Object.keys(result.error.data).forEach(key => {
            message = message + `${key}: ` + result.error.data[key][0];
          });
          toast.error(message, { autoClose: 6000 });
        }
      }
    }
  }
  return result;
};

// Base API slice
export const apiBase = createApi({
  baseQuery: baseQueryWithErrorHandling,
  endpoints: () => ({}), // Initial empty endpoints; will be injected later
});

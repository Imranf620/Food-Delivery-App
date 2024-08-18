// store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiBase } from '../services/apiBase'; // Import your base API
import cartReducer from '../features/cart/cartSlice';
import inventoryReducer from '../features/inventories/inventorySlice';
import authReducer from '../features/authentication/authSlice';
import invoiceReducer from '../features/invoiceSlice/invoiceSlice.js';


export const store = configureStore({
  reducer: {
    [apiBase.reducerPath]: apiBase.reducer,

    cart: cartReducer,
    inventory: inventoryReducer,
    auth: authReducer,
    invoice: invoiceReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiBase.middleware),
});

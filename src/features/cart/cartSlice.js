import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  userInfo: null,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add Item to cart
    addCartItem(state, action) {
      const item = state.items.find(item => item.id === action.payload.id);

      if (item) {
        cartSlice.caseReducers.increaseItemQuantity(state, action);
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          price: +action.payload.price,
        });
        state.totalPrice += +action.payload.price;
      }
    },

    // Add Cart when order is fetched from db
    addCartData(state, action) {
      const items = action.payload.items.map(itm => ({
        ...itm,
        lock: true,
        orgQuantity: itm.quantity,
      }));
      const userInfo = action.payload.userInfo;
      const totalPrice = +items.reduce(
        (acc, itm) => acc + +itm.price * +itm.quantity,
        0,
      );

      return { items, userInfo, totalPrice, orderId: action.payload.orderId };
    },

    // Increase item quantity in cart
    increaseItemQuantity(state, action) {
      const item = state.items.find(itm => itm.id === action.payload.id);
      if (item.lock) item.updated = true;
      item.quantity++;
      state.totalPrice += +item.price;
    },
    // Decrease item quantity in cart
    decreaseItemQuantity(state, action) {
      const item = state.items.find(itm => itm.id === action.payload.id);

      if (item.lock && item.updated) {
        if (item.orgQuantity === item.quantity - 1) {
          item.updated = false;
        }
      }

      if (item.quantity === 1) {
        state.totalPrice -= item.price;
        return cartSlice.caseReducers.deleteItem(state, action);
      }

      item.quantity--;
      state.totalPrice -= item.price;
    },
    // Delete Item from the cart
    deleteItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },

    // Add User Info,
    addUserInfo(state, action) {
      state.userInfo = action.payload;
    },

    // lock items
    lockItems(state, action) {
      state.items = state.items.map(itm => ({
        ...itm,
        lock: true,
        updated: false,
        orgQuantity: itm.quantity,
      }));
      state.orderId = action.payload.orderId;
    },
    // Clear the cart
    clearCart() {
      return initialState;
    },
  },
});

export const {
  addCartItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  addCartData,
  deleteItem,
  addUserInfo,
  lockItems,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: {
    amountPaid: null,
    remainingBalance: null,
    orderPrice: null,
    completedOrders: [], // New state for completed orders
    totalAmountPaid: 0, // New state for total amount paid
  },
  reducers: {
    setAmountPaid(state, action) {
      state.amountPaid = action.payload;
    },
    setRemainingBalance(state, action) {
      state.remainingBalance = action.payload;
    },
    setOrderPrice(state, action) {
      state.orderPrice = action.payload;
    },
    addCompletedOrder(state, action) {
      state.completedOrders.push(action.payload);
      state.totalAmountPaid += action.payload.amountPaid;
    },
    resetInvoiceState(state) {
      state.amountPaid = null;
      state.remainingBalance = null;
      state.changeDue = null;
    },
  },
});

export const { setAmountPaid, setRemainingBalance, setOrderPrice, addCompletedOrder, resetInvoiceState } = invoiceSlice.actions;

export default invoiceSlice.reducer;

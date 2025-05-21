import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
  totalItems: 0,
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCartSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.totalItems = action.payload.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.error = null;
    },
    fetchCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToCartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addToCartSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.totalItems = action.payload.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.error = null;
    },
    addToCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCartItemStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateCartItemSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.totalItems = action.payload.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.error = null;
    },
    updateCartItemFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeFromCartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    removeFromCartSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.totalItems = action.payload.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.error = null;
    },
    removeFromCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.totalItems = 0;
    },
    clearCartError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchCartStart,
  fetchCartSuccess,
  fetchCartFailure,
  addToCartStart,
  addToCartSuccess,
  addToCartFailure,
  updateCartItemStart,
  updateCartItemSuccess,
  updateCartItemFailure,
  removeFromCartStart,
  removeFromCartSuccess,
  removeFromCartFailure,
  clearCart,
  clearCartError,
} = cartSlice.actions;

export default cartSlice.reducer;

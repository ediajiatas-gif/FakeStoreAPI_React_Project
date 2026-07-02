import { createSlice } from '@reduxjs/toolkit';

const persistedCart = sessionStorage.getItem('cart');

const initialState = {
  items: persistedCart ? JSON.parse(persistedCart) : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      sessionStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      sessionStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateCount: (state, action) => {
      const { id, count } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (!item) return;

      if (count <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        item.count = count;
      }

      sessionStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      sessionStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart, updateCount, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

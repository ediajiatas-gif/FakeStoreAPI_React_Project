import { createSlice } from '@reduxjs/toolkit';

const persistedCart = sessionStorage.getItem('cart');

const initialState = {
  items: persistedCart ? JSON.parse(persistedCart) : [],
};

const saveCartToSession = (items) => {
  sessionStorage.setItem('cart', JSON.stringify(items));
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

      saveCartToSession(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToSession(state.items);
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

      saveCartToSession(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToSession(state.items);
    },
  },
});

export const { addToCart, removeFromCart, updateCount, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart-slice/cartSlice.js';

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Dodamo reducer za košarico
  },
});

export default store;

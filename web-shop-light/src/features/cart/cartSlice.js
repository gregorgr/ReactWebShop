// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const VAT_RATE = 0.22; // DDV (20%)

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
  totalQuantity: 0,
  totalAmount: 0,
  totalVAT: 0, // Novo: skupen DDV
};

const calculateTotals = (items) => {
  const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const totalVAT = totalAmount * VAT_RATE; // Izračun DDV
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  return { totalQuantity, totalAmount, totalVAT };
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity });
      }
      const { totalQuantity, totalAmount, totalVAT } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
      state.totalVAT = totalVAT;
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      const { totalQuantity, totalAmount, totalVAT } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
      state.totalVAT = totalVAT;
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.totalVAT = 0;
      localStorage.removeItem('cartItems');
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

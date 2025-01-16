// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const VAT_RATE = 0.22; // DDV (20%)

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
  totalQuantity: 0,
  totalAmount: 0,
  totalVAT: 0, // Novo: skupen DDV
  shippingAddress: null,
  shippingMethod: null,
  shippingCost: 0,
  orderDate: null,
  payment: {
    method: null,
    code: null,
  },
};

const calculateTotals = (items) => {
  const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const totalVAT = totalAmount * VAT_RATE; // Izračun DDV
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  return { totalQuantity, totalAmount, totalVAT };
};


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      items: [],
      totalAmount: 0,
      totalVAT: 0,
      shippingAddress: null,
      email: null,
      shippingMethod: null,
      shippingCost: 0,
  },

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
      localStorage.removeItem('shippingAddress');
      state.shippingAddress = null;
      state.shippingMethod = null;
      state.shippingCost = 0;
      state.orderDate = null;
      state.payment = {
          method: null,
          code: null,
      };
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
  },
    setShippingMethod: (state, action) => {
      state.shippingMethod = action.payload.text;
      state.shippingCost = action.payload.cost;
    },
    setOrderDate: (state, action) => {
      state.orderDate = action.payload;
    },
    setPayment: (state, action) => {
        state.payment = action.payload;
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    setCartSummary: (state, action) => {
      state.totalAmount = action.payload.totalAmount;
      state.totalVAT = action.payload.totalVAT;
      state.shippingCost = action.payload.shippingCost;
    },
  },
});

export const { 
  addItem, 
  removeItem, 
  clearCart, 
  updateQuantity, 
  setEmail,
  setShippingAddress,
  setShippingMethod,
  setCartSummary,
  setOrderDate,
  setPayment
} = cartSlice.actions;

export default cartSlice.reducer;

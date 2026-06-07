// src/store/cartSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// GET CART
export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('jwtToken');

      if (!token) {
        return thunkAPI.rejectWithValue('No token found. Please login.');
      }

      const res = await axios.get('http://localhost:5000/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.items;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Cart load failed'
      );
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;

// ---------------- SELECTORS ----------------

export const selectCartItems = (state) => state.cart.items;

export const selectCartLoading = (state) => state.cart.loading;

export const selectCartError = (state) => state.cart.error;

export const selectCartTotalItems = (state) =>
  state.cart.items.reduce((total, item) => total + Number(item.qty || 0), 0);

export const selectCartTotalPrice = (state) =>
  state.cart.items.reduce((total, item) => {
    const price = Number(item?.product?.price || 0);
    const qty = Number(item?.qty || 0);
    return total + price * qty;
  }, 0);
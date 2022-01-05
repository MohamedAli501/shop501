import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      state.push(payload);
      window.localStorage.setItem("cart501", JSON.stringify(state));
    },
    allPrice: (state, { payload }) => {
      let index = state.findIndex((obj) => obj.product.id === payload.id);
      state[index].count = payload.count;
      state[index].priceCount = state[index].product.price * state[index].count;
      window.localStorage.setItem("cart501", JSON.stringify(state));
    },
    deleteCartProduct: (state, { payload }) => {
      let remove = state.filter((pro) => pro.product.id !== payload);
      window.localStorage.setItem("cart501", JSON.stringify(remove));
      return remove;
    },
    loadCart: (state, { payload }) => {
      return payload;
    },
  },
});

export const { addToCart, allPrice, deleteCartProduct, loadCart } =
  cartSlice.actions;

export default cartSlice.reducer;

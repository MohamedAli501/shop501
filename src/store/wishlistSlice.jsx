import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishList: (state, { payload }) => {
      state.push(payload);
      window.localStorage.setItem("wishList", JSON.stringify(state));
    },
    deleteWishItem: (state, { payload }) => {
      let filterd = state.filter((item) => item.id !== payload.id);
      window.localStorage.setItem("wishList", JSON.stringify(filterd));
      return filterd;
    },
    loadWishItem: (state, { payload }) => {
      return payload;
    },
  },
});

export const { addWishList, deleteWishItem, loadWishItem } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;

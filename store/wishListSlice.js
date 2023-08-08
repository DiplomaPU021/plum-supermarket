import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishListItems: [],
  wishListTotal: 0,
};
export const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      state.wishListItems.push(action.payload);
      state.wishListTotal += 1;
    },
    updateWishList: (state, action) => {
      state.wishListItems = action.payload;
      state.wishListTotal = state.wishListItems.length;
    },
    emptyWishList: (state, action) => {
      state.wishListItems = [];
      state.wishListTotal = 0;
    },
  },
});

export const {
  addToWishList,
  updateWishList,
  emptyWishList,
  calculateTotal,
  incrementQuantity,
  decrementQuantity,
  removeFromWishList,
} = wishListSlice.actions;
export default wishListSlice.reducer;

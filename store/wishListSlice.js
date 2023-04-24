import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishListItems: [],
  wishListTotal:0,
};
export const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      state.wishListItems.push(action.payload);
      state.wishListTotal += 1.
    },
    updateWishList: (state, action) => {
      state.wishListItems = action.payload;
      state.wishListTotal=state.wishListItems.length;
    },
    emptyWishList: (state, action) => {
      state.wishListItems = [];
      state.wishListTotal = 0;
    },
    // incrementQuantity: (state, action) => {
    //   // console.log("state", state);
    //   // console.log("action", action);
    //   const item = state.find((item) => item._id === action.payload);
    //   item.qty++;
    // },
    // decrementQuantity: (state, action) => {
    //   const item = state.find((item) => item._id === action.payload);
    //   if (item.qty === 1) {
    //     const index = state.findIndex((item) => item._id === action.payload);
    //     state.splice(index, 1);
    //   } else {
    //     item.qty--;
    //   }
    // },
    // removeFromWishList: (state, action) => {
    //   const index = state.findIndex((item) => item._id === action.payload);
    //   state.splice(index, 1);
    // },
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
//export const wishListReducer = wishListSlice.reducer;

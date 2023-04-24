import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewedListItems: [],
};

export const viewedListSlice = createSlice({
  name: "viewedList",
  initialState,
  reducers: {
    addToViewedList: (state, action) => {
      const newItem = action.payload;
      state.viewedListItems.push(newItem);
    },

    emptyViewedList: (state) => {
      state.viewedListItems = [];
    },
  },
});

export const { addToViewedList, emptyViewedList } = viewedListSlice.actions;

export default viewedListSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchedListItems: [],
};

export const searchedListItems = createSlice({
  name: "searchedList",
  initialState,
  reducers: {
    addToSearchedList: (state, action) => {
      const newItem = action.payload;
      state.searchedListItems.push(newItem);
    },

    emptySearchedList: (state) => {
      state.searchedListItems = [];
    },
  },
});

export const { addToSearchedList, emptySearchedList } =
  searchedListItems.actions;

export default searchedListItems.reducer;

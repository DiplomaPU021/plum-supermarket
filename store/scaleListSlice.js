import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scaleListItems: [],
};

export const scaleListSlice = createSlice({
  name: "scaleList",
  initialState,
  reducers: {
    addToScaleList: (state, action) => {
      const newItem = action.payload;
      const subCategoryItems = state.scaleListItems.find(
        (item) => item.subCategory_id === newItem.subCategory_id
      );
      if (subCategoryItems) {
        subCategoryItems.items.push(newItem);
      } else {
        state.scaleListItems.push({
          subCategory_id: newItem.subCategory_id,
          subCategoryName: newItem.subCategoryName,
          items: [newItem],
        });
      }
    },
    updateScaleList: (state, action) => {
      const updatedItems = action.payload;
      const updatedsubCategoryItems = state.scaleListItems.find(
        (item) => item.subCategory_id === updatedItems.subCategory_id
      );
      if (updatedsubCategoryItems) {
        if (updatedsubCategoryItems.items.length === 1) {
          state.scaleListItems = state.scaleListItems.filter(
            (item) =>
              item.subCategory_id !== updatedsubCategoryItems.subCategory_id
          );
        } else {
          const index = updatedsubCategoryItems.items.findIndex(
            (item) => item._id === updatedItems._id
          );
          if (index !== -1) {
            updatedsubCategoryItems.items.splice(index, 1);
          }
        }
      }
    },
    removeFromScaleList: (state, action) => {
      const removedItem = action.payload;
      const updatedsubCategoryItems = state.scaleListItems.find(
        (item) => item.subCategory_id === removedItem.subCategory_id
      );
      if (updatedsubCategoryItems) {
        state.scaleListItems = state.scaleListItems.filter(
          (item) =>
            item.subCategory_id !== updatedsubCategoryItems.subCategory_id
        );
      }
    },

    emptyScaleList: (state) => {
      state.scaleListItems = [];
    },
  },
});

export const {
  addToScaleList,
  updateScaleList,
  emptyScaleList,
  removeFromScaleList,
} = scaleListSlice.actions;

export default scaleListSlice.reducer;

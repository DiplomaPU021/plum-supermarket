import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviewRatingValue: 0,
  numReviews: 0,
};
export const reviewSlice = createSlice({
  name: "reviewRating",
  initialState,
  reducers: {
    addToReviewRating: (state, action) => {
      const newRating = action.payload;
      state.reviewRatingValue =
        (state.reviewRatingValue * (state.numReviews - 1) + newRating) /
        state.numReviews;
    },
    addToNumberReviews: (state, action) => {
      state.numReviews += 1;
    },
    updateNumberReviews: (state, action) => {
      state.numReviews = action.payload;
    },
    updateReviewRating: (state, action) => {
      state.reviewRatingValue = action.payload;
    },
    emptyReviewRating: (state, action) => {
      state.reviewRatingValue = 0;
    },
  },
});

export const {
  addToReviewRating,
  updateNumberReviews,
  updateReviewRating,
  emptyReviewRating,
} = reviewSlice.actions;
export default reviewSlice.reducer;

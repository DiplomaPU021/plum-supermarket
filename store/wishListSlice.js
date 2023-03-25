import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    wishListItems: []
};
export const wishListSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {
        addToWishList: (state, action) => {
            state.wishListItems.push(action.payload)
        },
        updateWishList: (state, action) => {
            state.wishListItems = action.payload;
        },
        emptyWishList: (state, action) => {
            state.wishListItems = [];
        },
        calculateTotal: (state, action) => {
            state.wishListTotal = state.wishListItems.reduce((acc, item) => acc + item.price * item.qty, 0).toLocaleString();
        },
        incrementQuantity: (state, action) => {
            // console.log("state", state);
            // console.log("action", action);
            const item = state.find((item) => item._id === action.payload);
            item.qty++;
        },
        decrementQuantity: (state, action) => {
            const item = state.find((item) => item._id === action.payload);
            if (item.qty === 1) {
                const index = state.findIndex((item) => item._id === action.payload);
                state.splice(index, 1);
            } else {
                item.qty--;
            }
        },
        removeFromWishList: (state, action) => {
            const index = state.findIndex((item) => item._id === action.payload);
            state.splice(index, 1);
        },
    },
});

export const { addToWishList, updateWishList, emptyWishList, calculateTotal, incrementQuantity, decrementQuantity, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
//export const wishListReducer = wishListSlice.reducer;

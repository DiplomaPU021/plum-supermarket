import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    cartItems: []
};
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartItems.push(action.payload)
        },
        updateCart: (state, action) => {
            state.cartItems = action.payload;
        },
        emptyCart: (state, action) => {
            state.cartItems = [];
        },
        calculateTotal: (state, action) => {
            state.cartTotal = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toLocaleString();
        },
        incrementQuantity: (state, action) => {
            console.log("state", state);
            console.log("action", action);
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
        removeFromCart: (state, action) => {
            const index = state.findIndex((item) => item._id === action.payload);
            state.splice(index, 1);
        },
    },
});

export const { addToCart, updateCart, emptyCart, calculateTotal, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
//export const cartReducer = cartSlice.reducer;

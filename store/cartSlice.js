import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    cartItems: [],
    cartTotal:0,
    deleteAtOnce: false
};
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartItems.push(action.payload);
            state.cartTotal += 1.
        },
        updateCart: (state, action) => {
            state.cartItems = action.payload;
            state.cartTotal=state.cartItems.reduce((acc, item) => acc + item.qty, 0);
        },
        deleteApproval: (state, action) => {
            state.deleteAtOnce = true;
        },
        emptyCart: (state, action) => {
            state.cartItems = [];
            state.deleteAtOnce = false;
            state.cartTotal = 0;
        },
        calculateTotal: (state, action) => {
            state.cartTotal = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toLocaleString();
        },
        incrementQuantity: (state, action) => {
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

export const { addToCart, updateCart, deleteApproval, emptyCart, calculateTotal, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
//export const cartReducer = cartSlice.reducer;

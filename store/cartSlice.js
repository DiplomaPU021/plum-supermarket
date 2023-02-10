import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    cartItems: [],
};
export const cartSlice = createSlice({
    name: 'cart',
    initialState: { cartItems: []},
    reducers: {
        addToCart: (state, action) => {
            state.cartItems.push(action.payload);
        },
        updateCart: (state, action) => {
            state.cartItems = action.payload;
        },
        emptyCart: (state, action) => {
            state.cartItems = [];
        },
        incrementQuantity: (state, action) => {
            const item = state.find((item) => item.id === action.payload);
            item.quantity++;
          },
          decrementQuantity: (state, action) => {
            const item = state.find((item) => item.id === action.payload);
            if (item.quantity === 1) {
              const index = state.findIndex((item) => item.id === action.payload);
              state.splice(index, 1);
            } else {
              item.quantity--;
            }
          },
          removeFromCart: (state, action) => {
            const index = state.findIndex((item) => item.id === action.payload);
            state.splice(index, 1);
          },
    },
});

export const { addToCart, updateCart, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
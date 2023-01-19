import {createSlice} from '@reduxjs/toolkit';
export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
        reducers:{},
});

//export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;
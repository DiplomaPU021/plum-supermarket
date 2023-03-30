import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
//import storage from 'redux-persist/lib/storage'
//import AsyncStorage from '@react-native-community/async-storage';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { persistReducer } from "redux-persist";
import cart from "./cartSlice"
import wishList from "./wishListSlice"
import dialog from "./DialogSlice"
//import {cartReducer} from "./cartSlice";


const reducers = combineReducers({ cart, wishList , dialog});


const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        },
    };
};
const storage = 
typeof window !== "undefined"? createWebStorage("local") : createNoopStorage();

const config = {
    key: "root",
    storage: storage,
};

const reducer = persistReducer(config, reducers);
// const reducer = {
//     cart: cartReducer,

//   };
const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk],
});
export default store;
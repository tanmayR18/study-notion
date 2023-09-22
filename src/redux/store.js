import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import profileSlice from "../slices/profileSlice";
import cartSlice from "../slices/cartSlice";


const rootReducer = combineReducers({
    auth: authSlice,
    profile: profileSlice,
    cart: cartSlice,
})

const store = configureStore({
    reducer: rootReducer
})

export default store
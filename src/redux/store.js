import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import profileSlice from "../slices/profileSlice";
import cartSlices from "../slices/cartSlices";


const rootReducer = combineReducers({
    auth: authSlice,
    profile: profileSlice,
    cart: cartSlices,
})

const store = configureStore({
    reducer: rootReducer
})

export default store
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData:null,
    loading:false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
};

const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers:{
        setSignupData(state, value) {
            state.signupData = value.payload
        },
        setLoading(state, value){
            state.loading = value.payload
        },
        setToken(state, value){
            state.token = value.payload
        },
    }
}) 

export const { setLoading, setSignupData, setToken } = authSlice.actions
export default authSlice.reducer
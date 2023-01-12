import { createSlice } from "@reduxjs/toolkit";



const StoredToken = localStorage.getItem("token")
const StoredEmail = localStorage.getItem("email")
const tokenSlice = createSlice({
    name:"token",
    initialState: {token:StoredToken,email:StoredEmail},
    reducers:{
        addToken(state, action){
          state.token = action.payload;
          localStorage.setItem("token",action.payload)
        },
        removeToken(state, action){
        state.token = action.payload;
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        },
        storeEmail(state, action){
          const email = action.payload.replace(/[^0-9a-z]/gi)
          state.email = email;
          localStorage.setItem("email", email)
        }
    }
})

export const tokenActions = tokenSlice.actions;

export default tokenSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";



const AuthSlice = createSlice({
    name:"auth",
    initialState:{authState:false},
    reducers:{
        login(state){
        state.authState = true;
        },
        logout(state){
        state.authState = false;
        }

    }
    
})

export const authActions = AuthSlice.actions;

export default AuthSlice.reducer;
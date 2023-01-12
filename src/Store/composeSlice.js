import { createSlice } from "@reduxjs/toolkit";


const composeSlice = createSlice({
    name:"compose",
    initialState:{compose:false},
    reducers:{
        showCompose(state){
         state.compose = true;
        },
        hideCompose(state){
        state.compose = false;
        }
    }
})


export const composeActions = composeSlice.actions;

export default composeSlice.reducer;
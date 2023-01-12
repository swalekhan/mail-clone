import { createSlice } from "@reduxjs/toolkit";


const SIBtn = createSlice({
    name:"SIBtn",
    initialState:{SIBtnState:false},
    reducers:{
        sendItems(state){
            state.SIBtnState = true
        },
        inboxItems(state){
            state.SIBtnState = false
        }
    }
})

export const SIBtnActions = SIBtn.actions;

export default SIBtn.reducer;
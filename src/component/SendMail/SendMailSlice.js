import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteSendMail, fetchSendMail } from "./SendMailApi";



export const deleteSendMailAsync = createAsyncThunk(
    "send/delete",
    async (email) => {
        const response = await deleteSendMail(email)
        return response;
    }
)

export const fetchSendMailAsync = createAsyncThunk(
    "send/fetch",
    async(email) => {
    const response = await fetchSendMail(email)
    return response
    }
)

const SendMailSlice = createSlice({
    initialState:{
        sendMail:[],
        status:"succeeded"
    },
    name:"send",
    reducers:{
        // deleteItem(state, action){
        //     state.sendMail = state.sendMail.filter((item) => item.id !== action.payload)
        // },
    },
    extraReducers(builder) {
        builder
          .addCase(deleteSendMailAsync.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(deleteSendMailAsync.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.sendMail = state.sendMail.filter((item) => item.id !== action.payload)
          })
          .addCase(fetchSendMailAsync.pending, (state, action) => {
            state.status = 'loading'   
        })
          .addCase(fetchSendMailAsync.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.sendMail = action.payload
          })
        
      }
})

export const {deleteItem} = SendMailSlice.actions
export default SendMailSlice.reducer
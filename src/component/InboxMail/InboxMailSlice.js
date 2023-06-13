import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteInboxMail, fetchInboxMail, updateInboxMail } from "./InboxMailApi";



export const deleteInboxMailAsync = createAsyncThunk(
    "inbox/delete",
    async (data) => {
        const response = await deleteInboxMail(data)
        return response;
    }
)

export const fetchInboxMailAsync = createAsyncThunk(
    "inbox/fetch",
    async (email) => {
        const response = await fetchInboxMail(email)
        return response
    }
)

export const updateInboxMailAsync = createAsyncThunk(
    "inbox/update",
    async (data) => {
        const response = await updateInboxMail(data)
        return response
    }
)

const inboxMailSlice = createSlice({
    initialState: {
        inboxMail: [],
        status: "succeeded"
    },
    name: "inbox",
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(deleteInboxMailAsync.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteInboxMailAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.inboxMail = state.inboxMail.filter((item) => item.id !== action.payload)
            })
            .addCase(fetchInboxMailAsync.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchInboxMailAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.inboxMail = action.payload
            })
            .addCase(updateInboxMailAsync.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(updateInboxMailAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const find = state.inboxMail.find((item) => item.id === action.payload)
                if (find) {
                    find.isRead = false;
                }
            })

    }
})


export default inboxMailSlice.reducer
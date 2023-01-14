import { createSlice } from "@reduxjs/toolkit";


const SentMailSlice = createSlice({
    name: "send",
    initialState: { sendState: [] },
    reducers: {
        replaceSendMail(state, action) {
            state.sendState = action.payload
        },
        addSendMail(state, action) {
            state.sendState = [...state.sendState, action.payload]
        },
        deleteSendMail(state, action){
            state.sendState = state.sendState.filter((e)=> e._id !== action.payload)
            console.log(action.payload)
        }
        
    }
})

export const sendMailAction = SentMailSlice.actions;
export const fetchSendMail = (email) => {
    return async (dispatch) => {
        console.log("datafetch")
        const fetchSendData = async () => {
            const response = await fetch(`https://email-box-a1f52-default-rtdb.firebaseio.com/${email}.json`); // email is not email, it is a parametr which is passed in app component, from whre this function is calling;
            const data = await response.json();
            const arr = []
            for (let key in data) {
                arr.push({
                    _id: key,
                    text: data[key].text,
                    to: data[key].to,
                    subject: data[key].subject,
                    isRead: data[key].isRead,
                    id: data[key].id,
                    date:data[key].date,
                })
            }
            console.log("senddata", arr)
            return arr;
        }
        try {
            const data = await fetchSendData()
            dispatch(sendMailAction.replaceSendMail(data))
        } catch (err) {
            console.log(err)
        }
    }
}

export default SentMailSlice.reducer;
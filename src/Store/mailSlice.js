import { createSlice } from "@reduxjs/toolkit"

const mailSlice = createSlice({
    name: "mail",
    initialState: { mailState: [], totalUnreadMail: 0 },
    reducers: {
        replaceMail(state, action) {
            state.mailState = action.payload ? action.payload : [];
        },

        isReadHandler(state, action) {
            const existItemIndex = state.mailState.find((e) => e._id === action.payload)
            if(existItemIndex){
                existItemIndex.isRead = true
            }
        },
        deleteMail(state, action){
            state.mailState = state.mailState.filter((e)=> e._id !== action.payload)
        }
    }
})


export const fetchMail = (email) => {
    return async (dispatch) => {
        console.log("datafetch")
        const fetchData = async () => {
            const response = await fetch(`https://email-box-a1f52-default-rtdb.firebaseio.com/${email}.json`);
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
                    date:data[key].date
                })
            }
            console.log("mail", arr)
            return arr;
        }
        try {
                const data = await fetchData()
                dispatch(mailActions.replaceMail(data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;


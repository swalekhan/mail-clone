import { createSlice } from "@reduxjs/toolkit"

const mailSlice = createSlice({
    name: "mail",
    initialState: { mailState: [], totalUnreadMail: 0 },
    reducers: {
        replaceMail(state, action) {
            state.mailState = action.payload ? action.payload : [];
            // const unreadMail = state.mailState.filter((e) => e.isRead === false);
            // state.totalUnreadMail = unreadMail.length;
        },
        addMail(state, action) {
            state.mailState = [...state.mailState, action.payload];

            // const unreadMail = state.mailState.filter((e) => e.isRead === false);
            // state.totalUnreadMail = unreadMail.length;
        },
        isReadHandler(state, action) {
            const existItemIndex = state.mailState.find((e) => e.id === action.payload)
            if(existItemIndex){
                existItemIndex.isRead = true
            }
        },
        deleteMail(state, action){
            state.mailState = state.mailState.filter((e)=> e.id !== action.payload)
        }
    }
})

export const mailActions = mailSlice.actions;

export const putMail = (email, mail) => {
    return async (dispatch) => {
        const putdata = async () => {
            const response = await fetch(`https://email-box-a1f52-default-rtdb.firebaseio.com/${email}.json`, {
                method: "PUT",
                body: JSON.stringify({
                    mail: mail,
                }),
            })
            const data = await response.json()
            console.log("data", data)
        }
        try {
            putdata();
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchMail = (email) => {
    // console.log(email)
    return async (dispatch) => {
        console.log("datafetch")
        const fetchData = async () => {
            const response = await fetch(`https://email-box-a1f52-default-rtdb.firebaseio.com/${email}.json`);
            const data = await response.json();
            
            return data;
        }

        try {
            const data = await fetchData()
            dispatch(mailActions.replaceMail(data.mail))
        } catch (err) {
            console.log(err)
        }
    }
}

export default mailSlice.reducer;


import tokenReducer from './tokenSlice'
import { configureStore } from '@reduxjs/toolkit';
import composeReducer from './composeSlice';
import sendReducer from '../component/SendMail/SendMailSlice'
import inboxReducer from '../component/InboxMail/InboxMailSlice'

const store = configureStore({
    reducer: {
        token: tokenReducer,
        compose:composeReducer,
        inbox:inboxReducer,
        send: sendReducer,
    }
})

export default store;
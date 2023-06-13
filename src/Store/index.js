import authReducer from './AuthSlice'
import tokenReducer from './tokenSlice'
import { configureStore } from '@reduxjs/toolkit';
import composeReducer from './composeSlice';
import searchReducer from './searchSlice'
import sendReducer from '../component/SendMail/SendMailSlice'
import inboxReducer from '../component/InboxMail/InboxMailSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        token: tokenReducer,
        compose:composeReducer,
        inbox:inboxReducer,
        send: sendReducer,
        search:searchReducer,
    }
})

export default store;
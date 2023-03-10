import authReducer from './AuthSlice'
import tokenReducer from './tokenSlice'
import { configureStore } from '@reduxjs/toolkit';
import composeReducer from './composeSlice';
import mailReducer from './mailSlice'
import sendMailReducer from './SendMailSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        token: tokenReducer,
        compose:composeReducer,
        mail:mailReducer,
        send:sendMailReducer,
    }
})

export default store;
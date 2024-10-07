import {configureStore} from '@reduxjs/toolkit'
import auth_reducer from './Auth/AuthSlice'
import user_reducer from './User/UserSlice'

export const store = configureStore({
    reducer:{
        auth_user:auth_reducer,
        user_details: user_reducer
    }
})
import {createSlice} from '@reduxjs/toolkit'


const AuthSlice = createSlice({
    name:'auth',
    initialState:{
        name:null,
        isAuthenticated:false,
        isAdmin:false
    },
    reducers:{
        set_Authenticate:(state, action) =>{
            state.name=action.payload.first_name
            state.isAuthenticated=action.payload.isAuth
            state.isAdmin=action.payload.isAdmin
        }
    }
})

export const {set_Authenticate} = AuthSlice.actions;
export default AuthSlice.reducer;
import React, { useEffect } from 'react'
import {Route, Routes} from 'react-router-dom'
import UserLanding from './User/UserLanding'
import UserLogin from './User/UserLogin'
import UserLogout from './User/UserLogout'
import UserProfile from './User/UserProfile'
import UserSignin from './User/UserSignin'
import {useSelector,useDispatch} from 'react-redux'
import {set_Authenticate} from '../Redux/Auth/AuthSlice'
import {get_UserDetails} from '../Redux/User/UserSlice'
import UserAuth from '../Utils/UserAuth'
import PrivateRoute from './PrivateRouter'
import axios from '../axios'

function UserWrapper() {
  const {name,isAuthenticated} = useSelector((state)=> state.auth_user)
  const dispatch = useDispatch()


  useEffect(()=>{

    const checkAuth = async ()=>{
      const user = await UserAuth();
      dispatch(
        set_Authenticate({
          first_name:user.name,
          isAuth:user.isAuthenticated
        })
      )
    }
  
    const getUser = async ()=>{
      const token = JSON.parse(localStorage.getItem('access'))
      try{ 
        const res = await axios.get('/',{headers:{
          'Authorization': `Bearer ${token}`
        }})
        dispatch(
          get_UserDetails({
            first_name:res.data.first_name,
            last_name:res.data.last_name,
            profile_pic:res.data.profile_pic
          })
        )
      }catch(error){
        console.log(error)
      }
    }
    if (!name){
      checkAuth()
      
    }
    if(isAuthenticated){
      getUser()
    }
  },[name, isAuthenticated, dispatch])
  return (
    <div>
        <Routes>
            <Route path='' element={<UserLanding/>} />
            <Route path='signup' element={<UserSignin/>} />
            <Route path='login' element={<UserLogin/>} />
            <Route path='profile' element={<PrivateRoute><UserProfile/></PrivateRoute>} />
        </Routes>
    </div>
  )
}

export default UserWrapper
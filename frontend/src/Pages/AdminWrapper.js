import React, { useEffect } from 'react'
import {Route, Routes} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Adminlogin from './Admin/Adminlogin'
import CreateUserPage from'./Admin/CreateUserPage'
import UpdateUser from './Admin/UpdateuserPage'
import AdminHomePage from  './Admin/HomePage'
import AdminAuth from '../Utils/AdminAuth'
import AdminPrivateRouter from './AdminPrivateRouter'
import {set_Authenticate} from '../Redux/Auth/AuthSlice'
import {get_UserDetails} from '../Redux/User/UserSlice'
import axios from '../axios'

function AdminWrapper() {
  const {name,isAuthenticated} = useSelector((state)=> state.auth_user)
  const dispatch = useDispatch()

  useEffect(()=>{
    const authCheck = async ()=>{
      const admin = await AdminAuth();
      dispatch(
        set_Authenticate({
            first_name:admin.first_name,
            isAuth:admin.isAuthenticated,
            isAdmin:admin.isAdmin,
        })
      )
    }

    const getUser = async ()=>{
      const token = JSON.parse(localStorage.getItem('access'))
      try{
        const res = await axios.get('/',
        {headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json',
            'Accept':'application/json'
        }})
        if (res.status === 200){
          dispatch(
            get_UserDetails({
              first_name:res.data.first_name,
              last_name:res.data.last_name,
              profile_pic:res.data.profile_pic,
            })
          )
        }
      }catch(error){
        console.log(error) 
      }
    }
    if (!name){
      authCheck()
    }
    if (isAuthenticated){
      getUser()
    }
  },[name, isAuthenticated, dispatch])
  return (
    <div>
        <Routes>
            <Route path='/' element={<Adminlogin/>} /> 
            <Route path='/home' element={<AdminPrivateRouter><AdminHomePage/></AdminPrivateRouter>} />
            <Route path='/create_user' element={<AdminPrivateRouter><CreateUserPage/></AdminPrivateRouter>} />
            <Route path='/home/update/:id' element={<AdminPrivateRouter><UpdateUser/></AdminPrivateRouter>} />
        </Routes>
    </div>
  )
}

export default AdminWrapper
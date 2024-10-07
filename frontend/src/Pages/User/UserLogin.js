import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import UserLog from '../../Components/User/Userlogin/UserLogin'
import UserFooter from '../../Components/User/UserFooter/UserFooter'
import {useSelector} from 'react-redux'
function UserLogin() {
  const auth_user = useSelector((state) =>state.auth_user)
  const navigate = useNavigate()

  useEffect(()=>{
    if (auth_user.name){
      navigate('/')
    }
  })
  return (
    <div>
        <UserLog />
        <UserFooter />
    </div>
  )
}

export default UserLogin
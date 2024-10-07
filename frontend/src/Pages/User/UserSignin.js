import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserSignup from '../../Components/User/UserSignup/UserSignup'
import UserFooter from '../../Components/User/UserFooter/UserFooter'

export default function UserSignin() {

  const auth_user = useSelector((state) =>state.auth_user)
  const navigate = useNavigate()

  useEffect(()=>{
    if (auth_user.isAuthenticated){
      navigate('/')
    }
  })

  return (
    <div>
      <UserSignup/>
      <UserFooter/>
    </div>
  )
}

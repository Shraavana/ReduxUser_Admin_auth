import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../../Components/User/Header/Header'
import UserProfileContent from '../../Components/User/UserProfileContent/UserProfileContent'
import UserFooter from '../../Components/User/UserFooter/UserFooter'


function UserProfile() {
  return (
    <div className='cotainer'>
        <Header />
        <UserProfileContent />
        <UserFooter/>
    </div>
  )
}

export default UserProfile
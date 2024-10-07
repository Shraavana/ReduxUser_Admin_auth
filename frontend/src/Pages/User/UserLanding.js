import React from 'react'
// import {useNavigate} from 'react-router-dom'
import Header from '../../Components/User/Header/Header'
import HomeContent from '../../Components/User/HomeContent/HomeContent'
import UserFooter from '../../Components/User/UserFooter/UserFooter'

function UserLanding() {
  // const navigate = useNavigate()
  return (
    <div>
        <Header />
        <HomeContent />
        <UserFooter />
    </div>
  )
}

export default UserLanding
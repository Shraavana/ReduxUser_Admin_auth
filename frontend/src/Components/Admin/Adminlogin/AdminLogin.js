import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { set_Authenticate } from '../../../Redux/Auth/AuthSlice'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from '../../../axios'
import './AdminLogin.css'
import { jwtDecode } from 'jwt-decode';


function AdminLogin() {
   const { isAdmin } = useSelector((state) => state.auth_user)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const [loginData, setLogindata] = useState({
      email: '',
      password: ''
   })
   const [error, setError] = useState(null)

   useEffect(()=>{
      if (isAdmin){
         navigate('home')
      }
   })

   const handleOnchange = (e) => {
      setLogindata({ ...loginData, [e.target.name]: e.target.value })
      setError('')
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      console.log(loginData)
      if (!loginData.email || !loginData.password) {
         setError('All fields required')
      } else {
         try {
            const res = await axios.post("login/",loginData)
            if (res.status === 200) {
               if (!res.data.isAdmin) {
                  
                  toast.warning('You are not authorized to login.');
                  navigate('')
                  return; 
              }
               localStorage.setItem('user', JSON.stringify(res.data.email))
               localStorage.setItem('access', JSON.stringify(res.data.access_token))
               localStorage.setItem('refresh', JSON.stringify(res.data.refresh_token))
               
               dispatch(
                  set_Authenticate({
                     first_name: jwtDecode(res.data.access_token).first_name,
                     isAuth: true,
                     isAdmin: res.data.isAdmin
                  })
               )
               console.log(res)
               navigate('home')
            }
         } catch (error) {
            console.log(error.response)
         }
      }
   }


   return (
      <div className='adminlogin mt-5  d-flex flex-column justify-content-center'>
         <div className='text-center p-5'>
            <p className='text h1'>Admin Login</p>
         </div>
         <p style={{ color: 'red', padding: '1px' }}>{error ? error : ''}</p>
         <div className='px-5 pb-5 text-center'>
            <Form onSubmit={handleSubmit}>
               <Row className='justify-content-center'>
                  <Form.Control type='email' value={loginData.email} name='email' className='m-2 w-75' placeholder="email"
                     onChange={handleOnchange} />
               </Row>
               <Row className='justify-content-center'>
                  <Form.Control type='password' value={loginData.password} name='password' className='m-2 w-75' placeholder="password"
                     onChange={handleOnchange} />
               </Row>
               <Button variant="primary" type="submit">
                  Submit
               </Button>
            </Form>
         </div>
      </div>
   )
}

export default AdminLogin
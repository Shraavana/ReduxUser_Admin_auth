import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from "../../../axios"
import './UpdateUser.css'

function UpdateUser() {
   const { id } = useParams()
   const navigate = useNavigate()
   const [userData, setUserData] = useState({
      'email': "",
      'first_name': "",
      'last_name': "",
      'is_active': true
   })

   const getUserData = async () => {
      const token = JSON.parse(localStorage.getItem('access'))
      try {
         const res = await axios.get(`admin_home/${id}/`,{
            headers:{
               'Authorization':`Bearer ${token}`
            }
         })
         setUserData(res.data)
         console.log('the data is fected for update')
      } catch (error) {
         console.log(error)
         navigate('/admin/home')
         toast.warning('somthing went wrong !')
      }
   }

   useEffect(() => {
      getUserData()
   }, [id])

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setUserData({
         ...userData,
         [name]: type === 'checkbox' ? checked : value
      });
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      
      const token = JSON.parse(localStorage.getItem('access'))
      try{
         console.log(userData)
         const res = await axios.patch(`admin_home/update/${id}/`,userData,{
            headers:{
               'Authorization': `Bearer ${token}`
            }
         })
         console.log('success',res.data)
         toast.success('user successfull updated')
         navigate('/admin/home')
      }catch(error){
         console.log(error)
         toast.error(error.response.data.email[0])
      }
   }

   return (
      <section className="create-user" style={{ backgroundColor: '#eee' }}>
         <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
               <div className="col-xl-9">

                  <h1 className="text-dark mb-4">Update User </h1>
                  <form onSubmit={handleSubmit}>
                     <div className="card dg-dark" style={{ borderRadius: '15px' }}>
                        <div className="card-body">
                           <div className="row align-items-center justify-content-center pt-4 pb-3">
                              <div className="col-md-3 ps-5">
                                 <h6 className="mb-0">First name</h6>
                              </div>
                              <div className="col-md-5 pe-5">
                                 <input type="text" name='first_name' value={userData.first_name} className="form-control"
                                    onChange={ handleChange } />
                              </div>
                           </div>
                           <hr className="mx-n3" />
                           <div className="row align-items-center justify-content-center pt-4 pb-3">
                              <div className="col-md-3 ps-5">
                                 <h6 className="mb-0">Last name</h6>
                              </div>
                              <div className="col-md-5 pe-5">
                                 <input type="text" name='last_name' value={userData.last_name} className="form-control"
                                    onChange={ handleChange } />
                              </div>
                           </div>
                           <hr className="mx-n3" />
                           <div className="row align-items-center justify-content-center py-3">
                              <div className="col-md-3 ps-5">
                                 <h6 className="mb-0">Email address</h6>
                              </div>
                              <div className="col-md-5 pe-5">
                                 <input type="email" name='email' value={userData.email} className="form-control"
                                    onChange= {handleChange}  />
                              </div>
                           </div>
                           <hr className="mx-n3" />
                           <div className="row align-items-center justify-content-center py-3">
                              <div className="col-md-3 ps-5">
                                 <h6 className="mb-0">Active</h6>
                              </div>
                              <div className="col-md-5 pe-5">
                                 <input type="checkbox" name='is_active' defaultChecked={userData.is_active}
                                 onChange={ handleChange } />
                              </div>
                           </div>
                           <hr className="mx-n3" />
                           <div className="row align-items-center justify-content-center py-3" >
                              <div className='col-md-8 ps-5'>
                                 <button type="submit" className="btn btn-primary px-5">Update</button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </section>
   )
}

export default UpdateUser
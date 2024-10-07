import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from '../../../axios'
import './UserSignup'
function UserSignup() {
   const [formdata, setFormdata] = useState({
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      password2: ""
   })

   const [error, setError] = useState('')
   const navigate = useNavigate()

   const handleOnchange = (e) => {
      setFormdata({ ...formdata, [e.target.name]: e.target.value })
      setError('')
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      if (!formdata.email.trim() || !formdata.first_name.trim() || !formdata.last_name.trim() || !formdata.password.trim() || !formdata.password2.trim()) {
         toast.warning('all fields are required')
      }else if (formdata.password !== formdata.password2) {
         toast.warning('password not matching')
         
      } else if (formdata.password.length < 6) {
         console.log(formdata.password.length)
         toast.warning('password min length 6')
        
      }else{
        try{
         console.log(formdata)
         const res = await axios.post("signup/",formdata)
         
         if (res.status === 201){
            navigate('/login')
            console.log(res.data.message)
            toast.success(res.data.message)
         }
        }catch(error){
         if (error.response.status===400){
               console.log(error.response.data.email[0])
               toast.warning(error.response.data.email[0])
            }
            else
            {
               console.log(error);

            }
        }
      }

   }
   return (
      <section className="vh-100 bg-image"
         style={{ backgroundImage: `url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')` }}>
         <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
               <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                     <div className="card" style={{ borderRadius: '15px' }}>
                        <div className="card-body p-5">
                           <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                           <p style={{ color: 'red', padding: '1px' }}>{error ? error : ''}</p>
                           <form onSubmit={handleSubmit}>

                              <div className="form-outline mb-4">
                                 <input type="text" name='first_name' value={formdata.first_name} id="form3Example1cg" className="form-control form-control-lg"
                                    onChange={handleOnchange} />
                                 <label className="form-label" htmlFor="form3Example1cg">{formdata.first_name ? '' : 'Your First Name'}</label>
                              </div>
                              <div className="form-outline mb-4">
                                 <input type="text" name='last_name' value={formdata.last_name} id="form3Example1cdg" className="form-control form-control-lg"
                                    onChange={handleOnchange} />
                                 <label className="form-label" htmlFor="form3Example1cdg" >{formdata.last_name ? '' : 'Your Last Name'}</label>
                              </div>

                              <div className="form-outline mb-4">
                                 <input type="email" name='email' value={formdata.email} id="form3Example3cg" className="form-control form-control-lg"
                                    onChange={handleOnchange} />
                                 <label className="form-label" htmlFor="form3Example3cg">{formdata.email ? '' : 'Your Email'}</label>
                              </div>

                              <div className="form-outline mb-4">
                                 <input type="password" name='password' value={formdata.password} id="form3Example4cg" className="form-control form-control-lg"
                                    onChange={handleOnchange} />
                                 <label className="form-label" htmlFor="form3Example4cg">{formdata.password ? '' : 'Password'}</label>
                              </div>

                              <div className="form-outline mb-4">
                                 <input type="password" name='password2' value={formdata.password2} id="form3Example4cdg" className="form-control form-control-lg"
                                    onChange={handleOnchange} />
                                 <label className="form-label" htmlFor="form3Example4cdg">{formdata.password2 ? '' : 'Repeat your password'}</label>
                              </div>



                              <div className="d-flex justify-content-center">
                                 <button type="submit"
                                    className="button button-primary">Register</button>
                              </div>

                              <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to='/login'
                                 className="fw-bold text-body"><u>Login here</u></Link></p>

                           </form>

                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default UserSignup
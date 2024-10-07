import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from "../../../axios"
import './CreateUser.css'

function CreateUser() {
   const [formdata, setFormdata] = useState({
      'email': "",
      'first_name': "",
      'last_name': "",
      'password': "",
      'password2': "",
      'Profile.profile_pic':null,
   })

   const navigate = useNavigate()

   const handleOnchange = (e) => {
      setFormdata({ ...formdata, [e.target.name]: e.target.value })
   }
   const [image,setImage] = useState()
   const handleFileChange = (e) => {
      setFormdata({ ...formdata, 'Profile.profile_pic': e.target.files[0] })
      setImage(e.target.files[0])
      
   }
   const handleSubmit = async (e) => {
      e.preventDefault()

      if (!formdata.email.trim() || !formdata.first_name.trim() || !formdata.last_name.trim() || !formdata.password.trim() || !formdata.password2.trim()) {
         toast.warning('all fields are required')
      }else if (formdata.password != formdata.password2) {
         toast.warning('password not matching')
         
      } else if (formdata.password.length < 6) {
         console.log(formdata.password.length)
         toast.warning('password min length 6')
        
      }else{
         // const {profile_pic,...userData} = formdata

         // const form = new FormData();
         // // form.append('Profile.profile_pic',profile_pic)
         // for (const key in formdata){
         //    form.append(key,formdata[key])
         // }
            console.log(formdata)
            const token = JSON.parse(localStorage.getItem('access'))
           try{
            const res = await axios.post("admin_home/",formdata,{
               headers:{
                  'Authorization': `Bearer ${token}`,
                  'Content-Type':'multipart/form-data',
               }
            })

            if (res.status === 201){
               navigate('/admin/home')
               console.log(res.data.message)
               toast.success(res.data.message)
            }
           }catch(error){
            if (error.response.status === 400){
                  console.log(error.response.data.email[0])
                  toast.warning(error.response.data.email[0])
               }
               else
               {
                  console.log(error);
                  toast.warning(error.response)

               }
           }
      }

   }
   return (
      <section className="create-user" style={{ backgroundColor: '#eee' }}>
         <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
               <div className="col-xl-9">

                  <h1 className="text-dark mb-4">Create a user </h1>

                  <div className="card dg-dark" style={{ borderRadius: '15px' }}>
                     <div className="card-body" >
                        <form onSubmit={ handleSubmit}>
                           <div className="row align-items-center justify-content-center pt-4 pb-3">
                              <div className="col-md-3 ps-5">
                                 <h6 className="mb-0">First name</h6>
                              </div>
                              <div className="col-md-5 pe-5">
                                 <input type="text" name='first_name' value={formdata.first_name} className="form-control"
                                    onChange={handleOnchange} />
                              </div>
                           </div>
                           <hr className="mx-n3" />
                           <div className="row align-items-center justify-content-center pt-4 pb-3">
                              <div className="col-md-3 ps-5">
                                 <h6 className="mb-0">Last name</h6>
                              </div>
                              <div className="col-md-5 pe-5">
                                 <input type="text" name='last_name' value={formdata.last_name} className="form-control"
                                    onChange={handleOnchange} />
                              </div>
                           </div>
                           <hr className="mx-n3" />
                           <div className="row align-items-center justify-content-center py-3">
                              <div className="col-md-3 ps-5">
                                 <h6 className="mb-0">Email address</h6>
                              </div>
                              <div className="col-md-5 pe-5">
                                 <input type="email" name='email' value={formdata.email} className="form-control" placeholder="example@example.com"
                                    onChange={handleOnchange} />
                              </div>
                           </div>
                           <hr className="mx-n3" />
                           <div className="row align-items-center justify-content-center pt-4 pb-3">
                              <div className="col-md-3 ps-5">
                                 <h6 className="mb-0">Password</h6>
                              </div>
                              <div className="col-md-5 pe-5">
                                 <input type="password" name='password' value={formdata.password} className="form-control"
                                    onChange={handleOnchange} />
                              </div>
                           </div>
                           <hr className="mx-n3" />
                           <div className="row align-items-center justify-content-center pt-4 pb-3">
                              <div className="col-md-3 ps-5">
                                 <h6 className="mb-0">Confirm Password</h6>
                              </div>
                              <div className="col-md-5 pe-5">
                                 <input type="password" name='password2' value={formdata.password2} className="form-control"
                                    onChange={handleOnchange} />
                              </div>
                           </div>
                           <hr className="mx-n3" />
                        <div className="row align-items-center justify-content-center py-3">
                           <div className="col-md-3 ps-5">
                              <h6 className="mb-0">Upload profile pic</h6>
                           </div>
                           <div className="col-md-5 pe-5">
                              <input className="form-control" id="formFileLg" type="file" name='profile_pic' required onChange={handleFileChange}/>
                              <div >
                                 <br />
                                 <img className='dispaly-image' src={image? URL.createObjectURL(image):''} alt="" />
                              </div>
                           </div>
                        </div> 
                           <hr className="mx-n3" />
                           <div className="row align-items-center justify-content-center py-3" >
                              <div className='col-md-8 ps-5'>
                                 <button type="submit" className="btn btn-primary px-5">Create</button>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default CreateUser
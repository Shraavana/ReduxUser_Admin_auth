import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { set_Authenticate } from '../../../Redux/Auth/AuthSlice';
import axios from '../../../axios';
import './UserLogin.css';

function UserLogin() {
   const [loginData, setLoginData] = useState({
      email: "",
      password: "",
   });

   const [error, setError] = useState('');
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleOnchange = (e) => {
      setLoginData({ ...loginData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!loginData.email || !loginData.password) {
         setError('All fields required');
      } else {
         try {
            const res = await axios.post("login/", loginData);
            console.error(res.data);
            console.log('Response:', res); // Check the structure of the response object

            if (res.status === 200) {
               console.log('Data:', res.data); // Check the data property of the response object
               localStorage.setItem('user', JSON.stringify(res.data.email));
               localStorage.setItem('access', JSON.stringify(res.data.access_token));
               localStorage.setItem('refresh', JSON.stringify(res.data.refresh_token));

               dispatch(
                  set_Authenticate({
                     first_name: jwtDecode(res.data.access_token).first_name,
                     isAuth: true,
                     isAdmin: res.data.isAdmin
                  })
               );
               navigate('/');
            }
         } catch (error) {
            console.log(error.response);
            toast.warning(error.response.data.detail);
         }
      }
   };

   return (
      <div className="userlogin">
         <section className=" text-center text-lg-start d-flex justify-content-center">
            <div className="col-lg-4 card">
               <div className="row g-0 d-flex align-items-center justify-content-center">
                  <div className="col-lg-12">
                     <div className="card-body py-5 px-md-5">
                        <h2 className="text-uppercase text-center mb-5">Login</h2>
                        <p style={{ color: 'red', padding: '1px' }}>{error ? error : ''}</p>
                        <form onSubmit={handleSubmit}>

                           <div className="form-outline mb-4">
                              <input
                                 name='email'
                                 value={loginData.email}
                                 type="email"
                                 id="form2Example1"
                                 className="form-control"
                                 onChange={handleOnchange}
                              />
                              <label className="form-label" htmlFor="form2Example1">{loginData.email ? '' : 'Email address'}</label>
                           </div>

                           <div className="form-outline mb-4">
                              <input
                                 name='password'
                                 value={loginData.password}
                                 type="password"
                                 id="form2Example2"
                                 className="form-control"
                                 onChange={handleOnchange}
                              />
                              <label className="form-label" htmlFor="form2Example2">{loginData.password ? '' : 'Password'}</label>
                           </div>

                        <button type="submit" className="button button-primary">Sign in</button>
                           <p className="text-center text-muted mt-4 mb-0">New to here? <Link to='/signup' className="fw-bold text-body"><u>Signup</u></Link></p>

                        </form>

                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}

export default UserLogin;

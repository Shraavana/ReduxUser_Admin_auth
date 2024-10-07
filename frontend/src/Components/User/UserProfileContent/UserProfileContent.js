import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import axios from '../../../axios'
import {get_UserDetails} from '../../../Redux/User/UserSlice'
import './UserProfileContent.css'


function UserProfileContent() {

    const dispatch = useDispatch()
    const token = JSON.parse(localStorage.getItem('access'))
    const auth_user = useSelector((state)=> state.auth_user)
    const user_details = useSelector((state)=>state.user_details)
    const [userDetails, setUserDetails] = useState(null)
    const [newImage,setNewImage] = useState({
        image:null
    })
   
    
    const getUser = async ()=>{
        
        try{ 
          const res = await axios.get('/',{headers:{
            'Authorization': `Bearer ${token}`
          }})
          console.log(res.data)
          setUserDetails(res.data)
        }catch(error){
          console.log(error)
        }
      }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(token)
        let form_data = new FormData()
        form_data.append('profile_pic',newImage.image, newImage.image.name)
        axios.post('profile/update',form_data,
            {headers:{
                'content-type': 'multipart/form-data',
                'authorization': `Bearer ${token}`,
            }
            }).then(res =>{
                if (res.status === 201){
                    toast.success('image uploaded')
                }
            }).catch(err => {
                console.log(err)
                toast.success('please reload the page')
            })
    
    }

    useEffect(()=>{
        getUser()
    },[auth_user])

    return (
        <div className='profile'>
            <section >
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <img src={userDetails?userDetails.profile_pic?userDetails.profile_pic:"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                    :"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                                        alt="avatar"
                                        className="rounded-circle img-fluid" style={{ width: '150px' }} />
                                    <h5 className="my-3">{user_details.first_name} {user_details.last_name}</h5>
                                   <form onSubmit={handleSubmit}>
                                    <div className="d-flex justify-content-center mb-2">
                                            <input className='form-control btn btn-success btn-md' type="file" accept="image/png, image/jpeg"
                                             onChange={(e)=> setNewImage({image:e.target.files[0]})}/>
                                        </div>
                                        <div className="d-flex justify-content-center mb-2">
                                            <button type="submit" className="btn btn-primary btn-secondary"> save </button>
                                        </div>
                                   </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default UserProfileContent
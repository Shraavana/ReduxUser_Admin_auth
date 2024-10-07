import React, { useEffect, useState } from 'react';
import { BsCheckCircleFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from '../../../axios';
import './AdminHome.css';

function AdminHome() {

  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = async (url) => {
    const token = JSON.parse(localStorage.getItem('access'))
    try {
      const res = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (res.status === 200) {
        setUsers(res.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers('admin_home/')
  }, [])
  let result
      result = users.filter(({email,first_name}) => {
        return (
          email.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0 ||
          first_name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
        )
      }).map((user) => (
        <tr key={user.id}>
          <td className="text-center">{user.id}</td>
          <td className="text-center"><img src={user.Profile
            ? user.Profile.profile_pic
            : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
          } alt="avatar"
            className="rounded-circle img-fluid" style={{ width: '30px' }} /></td>
          <td>
            <div className="d-flex align-items-center ">
              <div className="ms-3">
                <p className="fw-bold mb-1">{user.first_name} {user.last_name}</p>
                <p className="text-muted mb-0">{user.email}</p>
              </div>
            </div>
          </td>
          <td className="text-center">
            <p className="fw-normal mb-1">{user.is_superuser ? <BsCheckCircleFill /> : '-'}</p>
          </td>
          <td className="text-center">
            <span >{new Date(user.date_joined).toLocaleDateString()}</span>
          </td>
          <td className="text-center">
            <i className="fa-regular fa-pen-to-square fa-xl" data-bs-toggle="modal" data-bs-target="#edit_data-one" style={{ color: '#2a13d8', cursor: 'pointer' }}
              onClick={() => navigate(`/admin/home/update/${user.id}`)}></i>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <i className="fa-solid fa-trash fa-xl" data-bs-toggle="modal" data-bs-target="#delete_data-one" style={{ color: '#da1b1b', fontSize: '900', cursor: 'pointer' }}
              onClick={() => { handleDelete(user.id) }}></i>
          </td>
        </tr>
      ))


  const handleDelete =  (id) => {
    const token = JSON.parse(localStorage.getItem('access'))
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`admin_home/delete/${id}/`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          fetchUsers('admin_home/');
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } catch (error) {
          console.error('not deleted', error.data)
        }
      }
    });
  }

  return (
    <div className='adminhomecontent' style={{ backgroundColor: '#eee', paddingBottom: '410px' }}>
      <div className='input-details'>
      <h4 className="my-4 text-center">User Details</h4>
        <input
          type="text"
          value={searchQuery}
          className="form-control "
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className="table align-middle mb-0 bg-white w-75">
        <thead className="bg-light">
          <tr>
            <th className="text-center">Id</th>
            <th className="text-center">profile pic</th>
            <th className="text-center">Name</th>
            <th className="text-center">Super User</th>
            <th className="text-center">Joined</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {result}
        </tbody>
      </table>
    </div>
  )
}

export default AdminHome
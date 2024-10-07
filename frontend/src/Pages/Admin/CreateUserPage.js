import React from 'react'
import CreateUser from '../../Components/Admin/CreateUser/CreateUser'
import AdminNavbar from '../../Components/Admin/AdminNavbar/AdminNavbar'
import AdminFooter from '../../Components/Admin/AdminFooter/AdminFooter'

function CreateUserPage() {
  return (
    <div>
        <AdminNavbar/>
        <CreateUser/>
        <AdminFooter/>
    </div>
  )
}

export default CreateUserPage
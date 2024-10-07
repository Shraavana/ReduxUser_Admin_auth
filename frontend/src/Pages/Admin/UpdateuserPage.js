import React from 'react'
import UpdateUser from '../../Components/Admin/UpdateUser/UpdateUser'
import AdminNavbar from '../../Components/Admin/AdminNavbar/AdminNavbar'
import AdminFooter from '../../Components/Admin/AdminFooter/AdminFooter'

function UpdateuserPage
() {
  return (
    <div>
        <AdminNavbar/>
        <UpdateUser/>
        <AdminFooter/>
    </div>
  )
}

export default UpdateuserPage

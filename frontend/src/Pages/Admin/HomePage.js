import React from 'react'
import AdminNavbar from '../../Components/Admin/AdminNavbar/AdminNavbar'
import AdminHome from '../../Components/Admin/AdminHome/AdminHome'
import AdminFooter from '../../Components/Admin/AdminFooter/AdminFooter'
import { SearchProvider } from '../../Context/Search'

function HomePage() {
  return (
    <div>
      <SearchProvider>
        <AdminNavbar />
        <AdminHome />
      </SearchProvider>
      <AdminFooter />
    </div>
  )
}

export default HomePage
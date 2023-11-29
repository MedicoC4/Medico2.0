import React from 'react'
import { Outlet } from 'react-router-dom'
import SideNav from '../components/sideNav/SideNav'

const layouts = () => {
  return (
    <div style={{ display: 'flex'}}>
        <SideNav />
        <div style={{width:'500px'}}>
            <Outlet />
        </div>
    </div>
  )
}

export default layouts
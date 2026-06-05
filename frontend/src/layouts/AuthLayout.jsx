import React from 'react'
import { Outlet } from 'react-router'

const AuthLayout = () => {
  return (
    <main className='min-min-vh-100'>
        <Outlet />
    </main>
  )
}

export default AuthLayout
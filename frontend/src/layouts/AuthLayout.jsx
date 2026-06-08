import React from 'react'
import { Outlet } from 'react-router'
import Header from '../pages/customer/shared/components/Header'
import Footer from '../pages/customer/shared/components/Footer'


const AuthLayout = () => {
  return (
    <>
    
    <main className='min-min-vh-100'>
        <Outlet />
    </main>
   
    </>
  )
}

export default AuthLayout
import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useSelector } from 'react-redux'

const AuthLayout = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  // Authorization: Only unauthenticated users can visit these routes
  if (isAuthenticated) {
    if (user?.role === "ROLE_ADMIN") return <Navigate to="/admin" replace />;
    if (user?.role === "ROLE_VENDOR") return <Navigate to="/vendor" replace />;
    return <Navigate to="/" replace />;
  }

  return (
    <>

      <main className='min-min-vh-100'>
        <Outlet />
      </main>

    </>
  )
}

export default AuthLayout
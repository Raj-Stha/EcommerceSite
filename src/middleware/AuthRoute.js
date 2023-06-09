import { replace } from 'formik';
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router';


const AuthRoute = () => {
  const userDetail = useSelector((state) => state.userInfo.userDetail);
  return userDetail !== null ? <Navigate to={'/'} replace /> : <Outlet />
}


export default AuthRoute
import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { Context } from '../App'
export const AuthController = (props) => {
  const { isSignin } = useContext(Context)
  if (isSignin) {
    return <Outlet/>
  }
  return <Navigate to='/signin'/>
}
export const AntiAuthController = (props) => {
  const { isSignin } = useContext(Context)
  if (!isSignin) {
    return <Outlet/>
  }
  return <Navigate to='/records'/>
}

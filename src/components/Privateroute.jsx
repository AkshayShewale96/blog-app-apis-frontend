import React from 'react'
import { isLoggedIn } from '../auth'
import { Navigate, Outlet } from 'react-router-dom'

const Privateroute =()=> {
   // outlet - comes from App.js (route)
   return isLoggedIn() ? <Outlet/> : <Navigate to={"/login"}/>
}
export default Privateroute
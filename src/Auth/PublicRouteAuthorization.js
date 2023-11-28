

 import React from 'react'
import { Navigate } from 'react-router'
 
 export default function PublicRouteAuthorization({children}) {

     const token  = window.localStorage.getItem("token") 
   return  token == undefined ? <Navigate to='/login' /> :  children
 }
 
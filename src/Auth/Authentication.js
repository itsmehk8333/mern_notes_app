import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router';

export default function Authentication() {

  const token  = window.localStorage.getItem("token") ;

  return token == undefined ? <Navigate to='/login' /> : <Outlet />
  
  
}



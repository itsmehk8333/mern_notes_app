import React from 'react'
import { Route, Router, Routes } from 'react-router'
import Notes from '../Components/Notes'
import Authentication from '../Auth/Authentication'
import LoginPage from '../Components/LoginPage'
import SingleNote from '../Components/SingleNote'
import ShowNotes from '../Components/ShowNotes'
import RegistrationPage from '../Components/RegistrationPage'
// import PublicRouteAuthorization from '../Auth/PublicRouteAuthorization'

export default function RoutesComponent() {
  return (


    <Routes>
      <Route element={<Authentication />}>
        <Route path='/' element={<Notes />} />
        <Route path='/singlenote' element={<ShowNotes />} />
      </Route>
      <Route path='/login' element={<LoginPage />} >
       
      </Route>
      <Route path='/registration' element={<RegistrationPage />} />
    </Routes>

    // <Routes>
    //   {/* private routes  */}
    //   <Route path='/homepage' element={<Notes />} />
    //   <Route path='/singlenote' element={<ShowNotes />}></Route>
    //   {/* public routes  */}

    // </Routes>
  )
}

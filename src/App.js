import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import ButtonAppBar from './Components/Navbar';
import Notes from './Components/Notes';
import RoutesComponent from './Routes/RoutesComponent';
import { useNavigate } from 'react-router';
import axios from 'axios';


function App() {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token") ;

  // axios.interceptors.response.use(function (res) {
  //    console.log(res)
  //   // if (res.data.message == "unautorized") {
  //   //   navigate("/login");
  //   //   window.localStorage.removeItem("token")
  //   // }
  // })
   console.log(token)


  const userLogin = window.localStorage.getItem("userdetails");
  return (
    <div>
      {token !== null ? <ButtonAppBar /> : null}

      <RoutesComponent />
    </div>
  );
}

export default App;

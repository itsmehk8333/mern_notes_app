import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Alert } from '@mui/material';
import SimpleSnackbar from './SnacbarComponent';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open , setOpen] = useState(false);
   const[loginMessage , setLoginMessag] = useState("")

  const navigation = useNavigate();
   
  window.localStorage.removeItem("token")

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:4000/login ", { "name": username, "password": password })
      .then(data => {
         console.log(data , "login.......")
        if (data.data.success == true) {
           console.log("login success")
          window.localStorage.setItem("token", JSON.stringify(data.data.token));
          setLoginMessag(data.data.message);
          setOpen(true)
          navigation("/")
        }else{
          setOpen(true)
          setLoginMessag(data.data.message)
        }

      })
      .catch(error => console.log(error))
    console.log('Logging in with:', { username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <StyledLoginContainer>
      <StyledForm onSubmit={handleSubmit}>
        <StyledHeader>Login</StyledHeader>
        <StyledLabel>
          Username:
          <StyledInput
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </StyledLabel>
        <StyledLabel>
          Password:
          <StyledInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </StyledLabel>        
        <StyledButton type="submit">Login</StyledButton>  <StyledButton style={{ background: "red" }} onClick={() => { navigation("/registration") }}  >Register</StyledButton>
      
      <SimpleSnackbar {...{open, setOpen , loginMessage}} />
      </StyledForm>

    </StyledLoginContainer>
  );
};

const StyledLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledForm = styled.form`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 300px;
`;

const StyledHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333333;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 15px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-top: 5px;
`;

const StyledButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

export default LoginPage;

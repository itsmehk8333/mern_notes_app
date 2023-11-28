// RegistrationPage.jsx
import axios from 'axios';
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';
const RegistrationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #3498db, #6c5b7b);
`;

const RegistrationForm = styled.form`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-in-out;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const FormButton = styled.button`
  background-color: #6c5b7b;
  color: #fff;
  padding: 12px 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #574d68;
  }
`;

const RegistrationPage = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [open, setOpen] = React.useState(false);
     const [loginMessage , setLoginMessage] = useState("")

    const navigation = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your registration logic here
        // console.log('Registration submitted:', { name, username, password, confirmPassword });

        const data = {
            "name": name,
            "username": username,
            "password": password,
            "email": email
        }
        axios.post("http://localhost:4000/register", data).then(data => {
             console.log(data)
            if (data.data.success == true) {
                setLoginMessage(data.data.message)
                setOpen(true)
                setTimeout(() => {
                    navigation("/login")
                }, 6000)
            }
            else{
                setLoginMessage(data.data.message)                 
                setOpen(true)
            }
           
        })
            .catch(error => console.log(error))
    };



    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <RegistrationContainer>
            <RegistrationForm onSubmit={handleSubmit}>
                <FormLabel>Name:</FormLabel>
                <FormInput
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <FormLabel>Username:</FormLabel>
                <FormInput
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <FormLabel>Email:</FormLabel>
                <FormInput
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <FormLabel>Password:</FormLabel>
                <FormInput
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <FormLabel>Confirm Password:</FormLabel>
                <FormInput
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <FormButton type="submit">Register</FormButton>
            </RegistrationForm>


            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={loginMessage}
                action={action}
                color=''
            />

                
            
        </RegistrationContainer>
    );
};

export default RegistrationPage;

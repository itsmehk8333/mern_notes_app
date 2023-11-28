import {  Button, Modal, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react';
import '../CSS/SingleNotes.css'
import Box from '@mui/material/Box';
import axios from 'axios';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';


export default function SingleNote({setOpen}) {
 const [notesName , setNotesName] = useState("");
 const [notesDescription , setNotesDescriptionValue] = useState("");

 const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  width: 96.5%;
  margin-top:20px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};


  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

  const saveNotesFunction  = () =>{
    const token = JSON.parse(window.localStorage.getItem("token"));
    var datass = {
     "notes_name": notesName,
      "notes_description": notesDescription
    }
    // console.log(noteName.current )
    axios.post("http://localhost:4000" ,datass, {headers:{
      Authorization : "Bearer" +" "+ token
    }}).then(data => {
      if(data.data.success == true){
        setOpen(false)
      }})
    .catch(error => console.log(error));
  }

  return (
    <div >

      {/* <Typography variant='h5' style={{marginBottom:"10px"}}>Notes </Typography>
       */}
      <TextField id="notesNameInput" label="Note's Name" variant='outlined' fullWidth 
      onChange={(e) =>{setNotesName(e.target.value)}} />
      <textarea  name="w3review" rows="4" cols="50" id="notesDescription" placeholder="Notes's Description"  onChange={(e) =>{setNotesDescriptionValue(e.target.value)}}></textarea>
      <Box sx={{mt:3}}>
        <Button variant='contained' color='error' style={{marginRight:"10px"}} onClick={() =>{setOpen(false)}}>Cancel</Button>
      <Button variant='contained' onClick={saveNotesFunction}>Save</Button>
      </Box>
    </div>
  )
}

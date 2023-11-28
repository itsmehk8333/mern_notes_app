import { Add } from '@mui/icons-material'
import React, { useEffect, useState } from 'react';
import notes from '../Resources/notesimage2.jpg';
import '../CSS/Notes.css';
import Tooltip from '@mui/material/Tooltip';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonAppBar from './Navbar';
import SingleNote from './SingleNote';
import axios from 'axios';
import { Grid, Paper } from '@mui/material';
import styled from '@emotion/styled';
import ShowNotes from './ShowNotes';
import { Link, useNavigate } from 'react-router-dom';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,

  p: 4,
};


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Notes() {

  const [notesArray, setNotesArray] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openNotes, setOpenNotes] = useState(false)

  const [todoValue, setTodoValue] = useState("")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
   const navigator = useNavigate()
   const token = JSON.parse(window.localStorage.getItem("token"))
    // console.log(token)

  useEffect(() => {


    axios.get("http://localhost:4000", {headers:{
      Authorization : "Bearer" +" "+token
    }}).then(data => {
       console.log(data)
      if(data.data.success == true){
        setNotesArray(data.data.data)
      }
  else{
     console.log("hittinh")
     if(data.data.success == false && data.data.message  ==  "unautorized"){
      window.localStorage.removeItem("token")
      navigator("/login")

     }

  }
  }).catch(error => console.log(error))
  }, [])

  const storeNotes = (data) => {
    window.localStorage.setItem("note", JSON.stringify(data))
  }
   
  return (
    <div >

      {notesArray.length > 0 ?
        <Box >
          <Grid container item spacing={3} className='notesMainGrid'   >
            {notesArray?.map((e, i) => (
              <Grid item key={i} xs={11} className='notesGrid' onClick={() => { setOpenNotes(true) }}>
                <Link to='/singlenote' style={{ textDecoration: "none", color: 'black' }} onClick={() => { storeNotes(e) }}  ><Box className="notesValuesDivision" id="notesDescriptionID">
                  {e.notes_description}
                </Box> </Link>
              </Grid>
            ))}
          </Grid>
        </Box> : <div style={{ textAlign: "center" }}>
          <img src={notes} className="emptyNotesImage" />
          <h4>Your note's is Empty !!!  Click below button to create your 1st notes</h4>
        </div>}
      <div className='IconDiv'>
        <Tooltip title="Create Notes" onClick={handleOpen}>
          <Add className='AddIconss' />
        </Tooltip>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >

        <Fade in={open}>
          <Box sx={style} className="ModalClass">

            <SingleNote {...{ setOpen }} />
          </Box>
        </Fade>
      </Modal>


    </div>
  )
}

export default Notes
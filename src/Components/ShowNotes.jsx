import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ButtonAppBar from './Navbar';
import '../CSS/ShowNotes.css';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { Delete, Edit, Settings } from '@mui/icons-material';
import axios from 'axios';
import { json, useNavigate } from 'react-router';
import { TextField, Typography } from '@mui/material';


export default function ShowNotes({ openNotes, setOpenNotes }) {
  // const [open, setOpen] = React.useState(false);
  const [noteValue, setNoteValue] = useState(JSON.parse(window.localStorage.getItem("note")))

  const [updatedNotesName, setupdatedNotesName] = useState(noteValue.notes_name);
  const [updatedDescription, setUpdateDescription] = useState(noteValue.notes_description)
  const [openNotesModal, setNotesModal] = useState(false);
  const token = JSON.parse(window.localStorage.getItem("token"))
  const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "4px",

  };


  const navigation = useNavigate()
  const handleOpen = () => {
    setOpenNotes(true);
  };
  const handleClose = () => {
    setOpenNotes(false);
  };

  // console.log(noteValue);

  const deleteNote = () => {
 console.log(noteValue._id)
    axios.delete(`http://localhost:4000/${noteValue._id}`, {headers:{
      Authorization : "Bearer" +" "+token
    }}).then(data => {
      if (data.data.acknowledged == true && data.data.deletedCount == 1) {
        navigation("/homepage")
      }
    }).catch(data => console.log(data))
  }


  const updateNotes = () => {

    let data = {
      "id": noteValue._id,
      "notes_name": updatedNotesName,
      "notes_description": updatedDescription
    }
    console.log(data)
    axios.put("http://localhost:4000", data, {
      headers: {
        Authorization: "Bearer" + " " + token
      }
    }).then(data => {
      if (data.data.success == true) {
        setNoteValue(data.data.data)
        // noteValue = data.data;
        window.localStorage.setItem("note", JSON.stringify(data.data.data))
        setNotesModal(false)

      }
    }
    ).catch(error => console.log(error))

  }

  const actions = [
    { icon: <Edit onClick={() => { setNotesModal(true) }} />, name: 'Edit Note' },
    { icon: <Delete onClick={deleteNote} />, name: 'Delete Note' },
    // { icon: <PrintIcon />, name: 'Print' },
    // { icon: <ShareIcon />, name: 'Share' },
  ];
  return (
    <Box id="showNotesContainer">

      <Box id="notesName">
        {noteValue?.notes_name}
      </Box>
      <Box id="showNotesDescription">
        {noteValue.notes_description}

      </Box>
      <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<Settings />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </Box>
      <Modal
        open={openNotesModal}
        onClose={() => { setNotesModal(false) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <TextField id="notesNameInput" label="Note's Name" variant='outlined' fullWidth
            defaultValue={noteValue.notes_name}
            onChange={(e) => { setupdatedNotesName(e.target.value) }}
          />
          <textarea name="w3review" rows="4" cols="50" id="notesDescription" placeholder="Notes's Description" defaultValue={noteValue.notes_description} onChange={(e) => { setUpdateDescription(e.target.value) }}></textarea>
          <Box sx={{ mt: 3, textAlign: "end" }}>
            <Button variant='contained' color='error' style={{ marginRight: "10px" }} onClick={() => { setNotesModal(false) }}>Cancel</Button>
            <Button variant='contained' onClick={() => { updateNotes() }} >Save</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

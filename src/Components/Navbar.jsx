import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { List, Logout, Menu, Notes } from '@mui/icons-material';
import Drawer from "@mui/material/Drawer";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
// import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Link to='/homepage' > 
        <ListItem key={"notes"} disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Notes />
          </ListItemIcon>
          <ListItemText primary={"Notes"} sx={{ textDecoration:"none", color: "black" }} />
        </ListItemButton>
      </ListItem>
      </Link>
      <Link to='/login' onClick={() =>{
      window.localStorage.removeItem("token")
      }}> 
        <ListItem key={"Logout"} disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary={"logout"} sx={{ textDecoration:"none", color: "black" }} />
        </ListItemButton>
      </ListItem>
      </Link>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer("left", true)}
          >
            <Menu />

          </IconButton>
          <Typography variant="h6" component="div">
            Notes
          </Typography>

        </Toolbar>
      </AppBar>
      <Drawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
    </Box>
  );
}
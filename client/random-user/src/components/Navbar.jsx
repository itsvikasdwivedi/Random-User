import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';


const Navbar = () => {
  const navigate = useNavigate();
  

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
        >

        </IconButton>
        <Typography onClick={()=>navigate("/")} variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Random User API
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
  );
};

export default Navbar;
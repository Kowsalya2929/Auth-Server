import React, { useState } from 'react';
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';

const Navbar = () => {
  const [anchorEl,setAnchorEl] = useState(null)
  const menuOpen = Boolean(anchorEl)
  const handleMenuOpen = (e)=>{
    setAnchorEl(e.currentTarget)
  }
  const handleMenuClose = ()=>{
    setAnchorEl(null)
  }
  return (
    <AppBar position="sticky" elevation={2}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          gap: 1,
          bgcolor: 'white',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Typography
          component={Link}
          to="/"
          variant="h6"
          color="primary"
          sx={{ textDecoration: 'none' }}
        >
          Auth App
        </Typography>

        <Button component={Link} to="/login" variant="outlined" size="medium">
          Login / Sign Up
        </Button>

        <IconButton onClick={handleMenuOpen} color="primary">
          <AccountCircle />
        </IconButton>
        <Menu
          open={menuOpen}
          anchorEl={anchorEl}
          onClose={handleMenuClose}
          anchorOrigin={{vertical:'bottom',horizontal:'right'}}
          transformOrigin={{vertical:'top',horizontal:'right'}}
        >
          <MenuItem component={Link} to={'/sendEmailVerify'} onClick={handleMenuClose}>Verify Email</MenuItem>
          <MenuItem component={Link} to={'/logout'} onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>  
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

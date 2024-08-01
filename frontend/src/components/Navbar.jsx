import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';



function Navbar() {
    const navigate = useNavigate() ;
    
    const handleHomeNavigation = () => {
        navigate('/')
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography style={{cursor: 'pointer'}} onClick={handleHomeNavigation } variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Cromwell
          </Typography>
         
        <Link style={{
            color: 'white'
        }}  to="/login">Login</Link>
        
        <Link style={{
            color: 'white'
        }}  to="/register">Register</Link>
        
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Navbar;
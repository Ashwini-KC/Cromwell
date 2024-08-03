import { Box, Button,  TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function Register() {

    const [fullName, setFullName]= useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const handleFullNameChange = (e)=>{
        setFullName(e.target.value);
    }

    const handleEmailChange = (e)=>{
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e)=>{
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) =>{
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('/api/users/register', { name:fullName,email, password,confirmPassword });
            console.log('Registration Success', response.data);
        }catch(error){
            console.error('Registration Failed:', error.response ? error.response.data : error.message);
        }
    }
    return (
        
        <>
        <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, display:'flex', justifyContent:'flex-start', flexDirection: 'column' }}>
          <TextField
              required          
              label="FullName"
              name="FullName"
              value={fullName}
              onChange={handleFullNameChange}
              autoFocus
              
            />
            <TextField
              required
              label="Email Address"
              name="email"
              value={email}
              onChange={handleEmailChange}
              autoFocus
            />
            <TextField
              required
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
             <TextField
              required
              name="confirm-password"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
              <Link to={'/login'} variant="body2">
                  Already have an account? Login
                </Link>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Register
            </Button>
            </Box>
        </>
    )
}
export default Register;
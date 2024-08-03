import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { setToken } from "../slices/authSlices";
function Login() {
    const [email, setEmail] = useState('');
    const [password,setPassword]= useState('');
    const navigate = useNavigate() ;
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth);

    const handleEmailChange= (e) =>{
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('/api/users/login', { email, password });
            console.log('Login Success', response.data);
            dispatch(setToken(response.data.token));
            navigate('/');
        }catch(error){
            console.error('Login Failed:', error.response ? error.response.data : error.message);
        }
    }

    return (      
        <>
        <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 8, display:'flex', justifyContent:'flex-start', flexDirection: 'column', alignItems:'center'}}>
            <TextField
              required
              id="email"
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
             <Link to={'/register'} variant="body2">
               No account? Register
                </Link>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
            </Box>
        </>
    )
}
export default Login;
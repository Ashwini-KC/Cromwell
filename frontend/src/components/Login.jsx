import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();
       console.log('Clicked');
    }
    return (      
        <>
        <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, display:'flex', justifyContent:'flex-start', flexDirection: 'column' }}>
            <TextField
              required
              id="email"
              label="Email Address"
              name="email"
              autoFocus
            />
            <TextField
              required
              name="password"
              label="Password"
              type="password"
              id="password"
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
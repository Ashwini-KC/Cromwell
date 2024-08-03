import React from 'react'
import Login from '../components/Login'

import { Box, Container } from '@mui/material'


const LoginPage = () => {
  return (
    <Container style ={{height:'80vh'}} component="main" maxWidth="xs">
        <Box
          sx={{
            height:'100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        > <Login /> </Box>
        
    </Container>
  )
}

export default LoginPage
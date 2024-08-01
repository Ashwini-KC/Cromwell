import { Box, Container } from '@mui/material'
import React from 'react'
import Register from '../components/Register'


const RegisterPage = () => {
  return (
    <Container style ={{height:'80vh'}} component="main" maxWidth="xs">
        <Box
          sx={{
            height:'100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ><Register /></Box>
        
    </Container>
  )
}

export default RegisterPage
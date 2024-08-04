import Login from '../components/Login'

import { Box, Container } from '@mui/material'


const LoginPage = () => {
	return (
		<Container style={{ width: '23rem' }} component="main" maxWidth='xs'>
			<Box
			className='form-box'
				>
				<Login />
			</Box>

		</Container>
	)
}

export default LoginPage
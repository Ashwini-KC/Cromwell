import { Box, Container } from '@mui/material'
import Register from '../components/Register'


const RegisterPage = () => {
	return (
		<Container style={{ width: '23rem' }} component="main" maxWidth="xs">
			<Box 
				className='form-box'
			>
				<Register />
			</Box>
		</Container>
	)
}

export default RegisterPage
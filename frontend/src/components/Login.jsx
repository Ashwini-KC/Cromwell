import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux"
import { setToken } from "../slices/authSlices";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [severity, setSeverity] = useState('success')
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [isFormValid, setIsFormValid] = useState(true);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	


	const handleEmailChange = (e) => {
		setEmail(e.target.value);


	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);


	}

	const handleClose = () => {
		setOpen(false);
	}



	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isFormValid) {
			try {
				const response = await axios.post('/api/users/login', { email, password });
				console.log('Login Success', response.data);
				setMessage('Loggedin Successfully')
				setSeverity('success')
				setOpen(true)

				dispatch(setToken(response.data.token));

				setTimeout(() => {
					navigate('/users');
				}, 2000);

			} catch (error) {
				let errorMessage = error.response ? error.response.data.message : error.message
				setSeverity('error')
				setMessage(errorMessage)
				setOpen(true)
				console.error('Login Failed:', error.response ? error.response.data.message : error.message);
			}
		}
	}


	useEffect(() => {
		if (!email.length) {
			setEmailError('Email is Required');
			setIsFormValid(false);
		} else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
			setEmailError('Email format is invalid');
			setIsFormValid(false);
		}
		else {
			setEmailError(false);
			setIsFormValid(true)
		}

	}, [email]);

	useEffect(() => {
		if (!password.length) {
			setPasswordError('password required');
			setIsFormValid(false);
		}
		else {
			setPasswordError(false);
			setIsFormValid(true)
		}
	}, [password])

	return (
		<>
			<Typography component="h1" variant="h5">
				Login
			</Typography>
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 8, display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center' }}>
				<TextField
					error={emailError ? true : false}
					helperText={emailError}
					id="email"
					label="Email Address"
					name="email"
					value={email}
					onChange={handleEmailChange}
					autoFocus
				/>
				<TextField
					error={passwordError ? true : false}
					helperText={passwordError}
					name="password"
					label="Password"
					type="password"
					value={password}
					onChange={handlePasswordChange}
				/>
				<Link to={'/register'} variant="body2">
					{/* eslint-disable-next-line react/no-unescaped-entities */}
					Don't have an account? Register
				</Link>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}>
					Login
				</Button>

				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					open={open}
					autoHideDuration={2000}
					onClose={handleClose}>
					<Alert
						severity={severity}>
						{message}
					</Alert>
				</Snackbar>
			</Box>
		</>
	)
}
export default Login;
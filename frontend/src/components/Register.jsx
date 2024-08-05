import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { setToken } from "../slices/authSlices";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


function Register() {

	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const navigate = useNavigate();
	const [severity, setSeverity] = useState('success');
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('')
	const [showPassword, setShowPassword] = useState(false);
	//Validation states
	const [fullnameError, setFullNameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [confirmPasswordError, setConfirmPasswordError] = useState(false);
	const [isFormValid, setIsFormValid] = useState(true);

	const dispatch = useDispatch();
	const handleFullNameChange = (e) => {
		setFullName(e.target.value);
	}

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	}

	const handleConfirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleClickShowPassword = () => {
		setShowPassword((show) => !show);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isFormValid) {

			try {

				const response = await axios.post('/api/users/register', { name: fullName, email, password, confirmPassword });
				console.log('Registration Success', response.data);

				setMessage('Registered Successfully')
				setSeverity('success')
				setOpen(true)

				dispatch(setToken(response.data.token));

				setTimeout(() => {
					navigate('/login');
				}, 2000);


			}
			catch (error) {
				let errorMessage = error.response ? error.response.data.error.message : error.message;

				setSeverity('error')
				setMessage(errorMessage)
				setOpen(true)

				console.error('Registration Failed:', error.response ? error.response.data.error.message : error.message);
			}
		}
	}

	//Validation of FullName field
	useEffect(() => {
		if (!fullName.length) {
			setFullNameError('FullName is Required');
			setIsFormValid(false);
		} else if (fullName.length < 3) {
			setFullNameError('FullName length is insuffucient');
			setIsFormValid(false);
		}
		else {
			setFullNameError(false);
			setIsFormValid(true);
		}

	}, [fullName]);

	//Validation of Email field
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
			setIsFormValid(true);
		}
	}, [email]);

	//Validation of Password field
	useEffect(() => {

		if (!password.length) {
			setPasswordError('Password required');
			setIsFormValid(false);
		}
		else if (!/(?=.*[A-Z])/.test(password)) {
			setPasswordError('Password must contain atleast one Uppercase Letter');
			setIsFormValid(false);
		}
		else if (!/(?=.*[a-z])/.test(password)) {
			setPasswordError('Password must contain atleast one Lowercase Letter');
			setIsFormValid(false);
		}

		else if (!/(?=.*\d)/.test(password)) {
			setPasswordError('Password must contain atleast one number');
			setIsFormValid(false);
		}

		else if (!/(?=.*[@$!%*?&])/.test(password)) {
			setPasswordError('Password must contain atleast one Special character');
			setIsFormValid(false);
		}

		else {
			setPasswordError(false);
			setIsFormValid(true);
		}
	}, [password]);

	//Validation of Confirm Password
	useEffect(() => {
		if (!confirmPassword.length) {
			setConfirmPasswordError('Confirm password is required');
			setIsFormValid(false);
		}
		else if (password !== confirmPassword) {
			setConfirmPasswordError('Passwords do not match');
			setIsFormValid(false);
		}
		else {
			setConfirmPasswordError(false);
			setIsFormValid(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [confirmPassword]);

	return (

		<>
			<Typography component="h1" variant="h5">
				Register
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit}
				className="form-flex"
			>
				<TextField
					error={fullnameError ? true : false}
					helperText={fullnameError}
					label="FullName"
					name="FullName"
					value={fullName}
					onChange={handleFullNameChange}
					autoFocus
				/>
				<TextField
					error={emailError ? true : false}
					helperText={emailError}

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
					type={showPassword ? 'text' : 'password'}
					value={password}
					onChange={handlePasswordChange}
					InputProps={{
						endAdornment:
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
					}}
				/>
				<TextField
					error={confirmPasswordError ? true : false}
					helperText={confirmPasswordError}
					name="confirm-password"
					label="Confirm Password"
					type={showPassword ? 'text' : 'password'}
					value={confirmPassword}
					onChange={handleConfirmPasswordChange}
					InputProps={{
						endAdornment:
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
					}}
				/>
				<Link 
				to={'/login'} 
				variant="body2"
				style={{ marginTop: 4}}
				>
					Already have an account? Login
				</Link>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					>
					Register
				</Button>
				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					open={open}
					autoHideDuration={10000}
					onClose={handleClose}
				>
					<Alert
						severity={severity}
					>
						{message}
					</Alert>
				</Snackbar>
			</Box>
		</>
	)
}
export default Register;
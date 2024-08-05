import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../slices/userSlice';
import { removeToken } from '../slices/authSlices';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Navbar() {
	const dispatch = useDispatch();
	const { userInfo } = useSelector(state => state.user);
	const { token } = useSelector(state => state.auth);
	const navigate = useNavigate();
	const [message, setMessage] = useState('');
	const [severity, setSeverity] = useState('success');
	const [open, setOpen] = useState(false);

	const handleHomeNavigation = () => {
		navigate('/');
	};

	const handleClose = () => {
		setOpen(false);
	}

	const handleLogout = () => {
		dispatch(removeToken());
		dispatch(setUser(null));
		setMessage('User logged out');
		setSeverity('success');
		setOpen(true);
	};

	useEffect(() => {
		const fetchUserData = async () => {
			if (token) {
				try {
					const response = await axios.get('/api/users/', {
						headers: { Authorization: `Bearer ${token}` },
					});
					dispatch(setUser(response.data.data));
				} catch (error) {
					console.error('Failed to fetch user details:', error.response ? error.response.data : error.message);
				}
			}
		};
		fetchUserData();
	}, [token, dispatch]);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" color="primary">
				<Container>
					<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<Typography
							onClick={handleHomeNavigation}
							variant="h4"
							component="div"
							sx={{ cursor: 'pointer', flexGrow: 1 }}
						>
							Cromwell
						</Typography>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							{token && userInfo ? (
								userInfo ? (
									<>
										<Button
											onClick={handleLogout}
											sx={{ color: 'white', marginRight: '10px' }}>
											Logout
										</Button>
										<Button
											component={Link}
											to="/users"
											sx={{ color: 'white' }}>
											{userInfo?.name}
										</Button>

									</>
								) : (
									<CircularProgress
										color="inherit"
										size={24}
									/>
								)
							) : (
								<>
									<Button
										component={Link}
										to="/login"
										sx={{ color: 'white', marginRight: '10px' }}
									>
										Login
									</Button>
									<Button
										component={Link}
										to="/register"
										sx={{ color: 'white' }}
									>
										Register
									</Button>
								</>
							)}
						</Box>
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
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
}

export default Navbar;

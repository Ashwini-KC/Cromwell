import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

const LandingPage = () => {
	const { token } = useSelector(state => state.auth);
	const { userInfo } = useSelector(state => state.user);

	if (!token) {
		return (
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				height="75vh"
				textAlign="center">
				<Typography variant="h4" gutterBottom>
					Please Login/Register
				</Typography>
				<Box mt={2}>
					<Button
						component={Link}
						to="/login"
						variant="contained"
						color="primary"
						style={{ marginRight: '10px' }}
					>
						Login
					</Button>
					<Button
						component={Link}
						to="/register"
						variant="contained"
						color="secondary">
						Register
					</Button>
				</Box>
			</Box>
		);
	}

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			height="75vh"
			textAlign="center">
			<Card>
				<CardContent>
					<Typography variant="h5" gutterBottom>
						Welcome, {userInfo?.name}!
					</Typography>
					<Typography variant="body1">
						Email: {userInfo?.email}
					</Typography>
				</CardContent>
			</Card>
		</Box>
	);
};

export default LandingPage;

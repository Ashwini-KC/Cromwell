import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Button, Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

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
      height="calc(100vh - 100px)"
      textAlign="center"
      sx={{ backgroundColor: '#f0f4f8', padding: 2 }}
    >
      <Card sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Avatar 
            sx={{ bgcolor: deepPurple[500], width: 56, height: 56, marginBottom: 2 }}
            alt={userInfo?.name}
          >
            {userInfo?.name?.charAt(0)}
          </Avatar>
          <Typography variant="h5" gutterBottom>
            Welcome, {userInfo?.name}!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {userInfo?.email}
          </Typography>
        </CardContent>
      </Card>
    </Box>
	);
};

export default LandingPage;

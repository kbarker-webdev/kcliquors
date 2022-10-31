import React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Paper, Button } from '@mui/material';
import Container from '@mui/material/Container';

const Checkout = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		alert('Order has been placed. You will recieve and email with conformation.')
		navigate('/home')
	};

	return (
		<>
			<Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
				<Paper
					variant='outlined'
					sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
				>
					<Typography variant='h6' gutterBottom>
						Payment Information
					</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id='name'
								label='Full name'
								fullWidth
								variant='standard'
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id='cardNumber'
								label='Card number'
								fullWidth
								variant='standard'
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id='Expiry Date'
								label='Expiry Date'
								fullWidth
								variant='standard'
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id='CVV'
								label='CVV'
								fullWidth
								variant='standard'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								id='address1'
								name='address1'
								label='Address line 1'
								fullWidth
								autoComplete='shipping address-line1'
								variant='standard'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id='address2'
								name='address2'
								label='Address line 2'
								fullWidth
								autoComplete='shipping address-line2'
								variant='standard'
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id='city'
								name='city'
								label='City'
								fullWidth
								autoComplete='shipping address-level2'
								variant='standard'
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id='state'
								name='state'
								label='State/Province/Region'
								fullWidth
								variant='standard'
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id='zip'
								name='zip'
								label='Zip / Postal code'
								fullWidth
								autoComplete='shipping postal-code'
								variant='standard'
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id='country'
								name='country'
								label='Country'
								fullWidth
								autoComplete='shipping country'
								variant='standard'
							/>
						</Grid>
						<Grid item xs={12}>
							<Button fullWidth onClick={handleClick}>
								Order Now
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</Container>
		</>
	);
};

export default Checkout;

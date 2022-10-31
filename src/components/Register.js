import React from 'react';
import { TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { register } from '../axios-services';

const Register = (props) => {
	const navigate = useNavigate();
	const [username, setUsername] = [props.username, props.setUsername];
	const [password, setPassword] = [props.password, props.setPassword];
	const [email, setEmail] = React.useState('');

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			let resp = await register(username, password, email, false);
			let token = resp.token;
			if (!resp.token) {
				alert('User already exists');
			} else {
				let user = { username, token };
				localStorage.setItem('token', token);
				props.setLoggedInUser(user);
				navigate('/products');
			}
			setPassword('');
			setUsername('');
			setEmail('');
		} catch (error) {
			throw error;
		}
	};

	return (
		<div className='login-container'>
			<form onSubmit={submitHandler}>
			<Paper
				variant='outlined'
				sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
				<TextField
					id='outlined-required'
					label='Username'
					variant='outlined'
					value={username}
					onChange={handleUsernameChange}
				/>
				<TextField
					id='outlined-required'
					label='Email'
					variant='outlined'
					value={email}
					onChange={handleEmailChange}
				/>
				<TextField
					id='outlined-required'
					label='Password'
					variant='outlined'
					className='password-field'
					type='password'
					value={password}
					onChange={handlePasswordChange}
				/>
				<Button
					variant='contained'
					onClick={submitHandler}
					type='submit'
				>
					Register
				</Button>{' '}
				</Paper>
			</form>
		</div>
	);
};

export default Register;

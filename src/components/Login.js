import React from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../axios-services';
import { Paper } from '@mui/material';

const Login = (props) => {
	const navigate = useNavigate();
	const [username, setUsername] = [props.username, props.setUsername];
	const [password, setPassword] = [props.password, props.setPassword];
	const loggedInUser = props.loggedInUser;

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			let resp = await login(username, password);
			let token = resp.token;
			let user = { username, token };
			if (!resp.token) {
				alert('Username or password incorrect');
			} else {
				localStorage.setItem('token', token);
				localStorage.setItem('username', username);
				props.setLoggedInUser(user);
				navigate('/products');
			}
			setPassword('');
			setUsername('');
			window.location.reload(false);
		} catch (error) {
			throw error;
		}
	};
	const handleLogout = async (e) => {
		e.preventDefault();
		try {
			localStorage.removeItem('username');
			localStorage.removeItem('token');
			props.setLoggedInUser({});
			window.location.reload(false);
		} catch (error) {
			throw error;
		}
	};

	return (
		<div className='login-container'>
			<Paper
				variant='outlined'
				sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
			>
				<div className='box'>
					<form className='form-container' onSubmit={submitHandler}>
						{!loggedInUser.token ? (
							<TextField
								id='outlined-required'
								label='Username'
								variant='outlined'
								color='primary'
								value={username}
								onChange={handleUsernameChange}
							/>
						) : (
							<h2 class='loggedIn'>
								You are logged in as {loggedInUser.username}
							</h2>
						)}
						{!loggedInUser.token ? (
							<TextField
								id='outlined-required'
								label='Password'
								variant='outlined'
								className='password-field'
								type='password'
								value={password}
								onChange={handlePasswordChange}
								sx={{ mt: 2, mb: 2 }}
							/>
						) : null}
						{!loggedInUser.token ? (
							<Button
								variant='contained'
								onClick={submitHandler}
								type='submit'
							>
								Login
							</Button>
						) : (
							<Button variant='contained' onClick={handleLogout}>
								Logout
							</Button>
						)}{' '}
						{!loggedInUser.token ? (
							<a href='/register'>Not Registered? Click Here</a>
						) : null}
					</form>
				</div>
			</Paper>
		</div>
	);
};

export default Login;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Products from './Products';
import Admin from './Admin';
import Users from './Users';
import CreateProdAdmin from './CreateProdAdmin';
import { ShoppingCart } from '@mui/icons-material';
import {
	initiateGuestCart,
	initiateOrder,
	isTokenAdmin,
	login,
} from '../axios-services';
import '../style/App.css';
import SingleProductView from './SingleProductView';
import Cart from './Cart';
import Checkout from './Checkout';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { IconButton } from '@mui/material';

const App = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loggedInUser, setLoggedInUser] = useState({});
	const [cart, setCart] = useState([]);
	const [order, setOrder] = useState();
	const [isAdmin, setIsAdmin] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (localStorage.token && localStorage.username) {
			setLoggedInUser({
				token: localStorage.token,
				username: localStorage.username,
			});
			initiateOrder(localStorage.token).then((res) => {
				setOrder(res);
			});
			isTokenAdmin(localStorage.token).then((res) => {
				if (res === 'User is an authorized admin') {
					setIsAdmin(true);
				} else {
					setIsAdmin(false);
				}
			});
		} else {
			initiateGuestCart().then((res) => {
				setOrder(res);
			});
		}
	}, []);

	const handleLoginAdmin = async (e) => {
		localStorage.removeItem('username');
		localStorage.removeItem('token');
		setLoggedInUser({});

		const resp = await login('admin', 'admin');
		const token = resp.token;
		const user = { username: 'admin', token };
		localStorage.setItem('token', token);
		localStorage.setItem('username', 'admin');
		setLoggedInUser(user);
		setPassword('');
		setUsername('');
		window.location.reload(false);
	};

	const handleLoginUser = async (e) => {
		localStorage.removeItem('username');
		localStorage.removeItem('token');
		setLoggedInUser({});

		const resp = await login('JohnSnow', 'winteriscoming');
		const token = resp.token;
		const user = { username: 'JohnSnow', token };
		localStorage.setItem('token', token);
		localStorage.setItem('username', 'JohnSnow');
		setLoggedInUser(user);
		setPassword('');
		setUsername('');
		window.location.reload(false);
	};

	const handleClose = (event) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	return (
		<div className='app-container'>
			<Router>
				<div className='navbar'>
					<div className='title-cart'>
						<h1 className='site-title'>KC Liquors</h1>
						<div>
							<h2 className='white'>
								Hello{' '}
								{loggedInUser.username
									? loggedInUser.username
									: 'Guest'}
								!
							</h2>

							<Link className='white' to='/cart'>
								<ShoppingCart></ShoppingCart>
							</Link>
						</div>
					</div>
					<nav>
						<Link className='link' to='/home'>
							Home
						</Link>
						<Link className='link' to='/products'>
							Products
						</Link>
						{isAdmin ? (
							<Link className='link' to='/admin'>
								Admin
							</Link>
						) : null}
						<Link className='link' to='/login'>
							Login/Logout
						</Link>
					</nav>
				</div>
				<div className='main'>
					<Routes>
						<Route path='/' element={<Home></Home>} />
						<Route
							path='/products/wine/:id'
							element={<SingleProductView 
							token={localStorage.token}>
						</SingleProductView>}
						></Route>
						<Route
							path='/products/beer/:id'
							element={<SingleProductView 
							token={localStorage.token}>
						</SingleProductView>}
						></Route>
						<Route
							path='/products/spirit/:id'
							element={<SingleProductView 
							token={localStorage.token}>
						</SingleProductView>}
						></Route>
						<Route
							path='/login'
							element={
								<Login
									setUsername={setUsername}
									setPassword={setPassword}
									username={username}
									password={password}
									loggedInUser={loggedInUser}
									setLoggedInUser={setLoggedInUser}
								/>
							}
						/>
						<Route path='/home' element={<Home />} />
						<Route
							path='/products'
							element={
								<Products
									order={order}
									setOrder={setOrder}
									cart={cart}
									setCart={setCart}
									token={loggedInUser.token}
								/>
							}
						/>
						<Route
							path='/products/beer'
							element={
								<Products
									order={order}
									setOrder={setOrder}
									cart={cart}
									setCart={setCart}
									token={loggedInUser.token}
									category='beer'
								/>
							}
						/>
						<Route
							path='/products/wine'
							element={
								<Products
									order={order}
									setOrder={setOrder}
									cart={cart}
									setCart={setCart}
									token={loggedInUser.token}
									category='wine'
								/>
							}
						/>
						<Route
							path='/products/spirits'
							element={
								<Products
									order={order}
									setOrder={setOrder}
									cart={cart}
									setCart={setCart}
									token={loggedInUser.token}
									category='spirits'
								/>
							}
						/>
						<Route
							path='/register'
							element={
								<Register
									setUsername={setUsername}
									setPassword={setPassword}
									username={username}
									password={password}
									loggedInUser={loggedInUser}
									setLoggedInUser={setLoggedInUser}
								/>
							}
						></Route>
						<Route
							path='/products/:id'
							element={<SingleProductView />}
						></Route>
						<Route
							path='/cart'
							element={
								<Cart
									order={order}
									cart={cart}
									setCart={setCart}
									token={loggedInUser.token}
								/>
							}
						></Route>
						<Route
							path='/checkout'
							element={
								<Checkout
									order={order}
									cart={cart}
									token={loggedInUser.token}
								/>
							}
						></Route>
						<Route 
							path='/admin'
							element={<Admin></Admin>}
							></Route>
						<Route
							path='/admin/viewusers'
							element={<Users token={localStorage.token}></Users>}
						></Route>
						<Route
							path='/admin/createnewproduct'
							element={<CreateProdAdmin token={localStorage.token}></CreateProdAdmin>}
						></Route>
						<Route
							path='/admin/editproduct'
							element={<Products 
								edit={true}
								order={order}
								setOrder={setOrder}
								cart={cart}
								setCart={setCart}
								token={localStorage.token}></Products>}
						></Route>
						<Route
							path='/admin/editproduct/:id'
							element={<SingleProductView 
							edit={true}
							token={localStorage.token}>
						</SingleProductView>}
						></Route>
						</Routes>
				</div>
				<div className='footer-container'>
					<div className='login-links-container'>
						<p className='footer-link' onClick={handleLoginUser}>
							Login As User
						</p>
					</div>
					<div className='project-links-container'>
						<p>Project's GitHub</p>
						<IconButton
							onClick={() =>
								window.open(
									'https://github.com/proj-kck',
									'_blank'
								)
							}
						>
							{' '}
							<GitHubIcon></GitHubIcon>
						</IconButton>
					</div>
					<div className='kenny-links-container'>
						<p>Kenny's Links</p>
						<div>
							<IconButton
								onClick={() =>
									window.open(
										'https://www.linkedin.com/in/kenneth-barker-developer',
										'_blank'
									)
								}
								color='primary'
							>
								{' '}
								<LinkedInIcon></LinkedInIcon>
							</IconButton>
							<IconButton
								onClick={() =>
									window.open(
										'https://github.com/kbarker-webdev',
										'_blank'
									)
								}
							>
								{' '}
								<GitHubIcon></GitHubIcon>
							</IconButton>
						</div>
					</div>
					<div className='cameron-links-container'>
						<p>Cameron's Links</p>
						<div>
							<IconButton
								onClick={() =>
									window.open(
										'https://github.com/cgudge',
										'_blank'
									)
								}
								color='primary'
							>
								{' '}
								<LinkedInIcon></LinkedInIcon>
							</IconButton>
							<IconButton
								onClick={() =>
									window.open(
										'https://github.com/cgudge',
										'_blank'
									)
								}
							>
								{' '}
								<GitHubIcon></GitHubIcon>
							</IconButton>
						</div>
					</div>
					<div className='kesty-links-container'>
						<p>Ketsy's Links</p>
						<div>
							<IconButton
								onClick={() =>
									window.open(
										'https://www.linkedin.com/in/ketsy-delgado/',
										'_blank'
									)
								}
								color='primary'
							>
								{' '}
								<LinkedInIcon></LinkedInIcon>
							</IconButton>
							<IconButton
								onClick={() =>
									window.open(
										'https://github.com/ketsy22',
										'_blank'
									)
								}
							>
								{' '}
								<GitHubIcon></GitHubIcon>
							</IconButton>
						</div>
					</div>
				</div>
			</Router>
		</div>
	);
};
export default App;

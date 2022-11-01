import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, editProduct, addProductToOrder, addProductToOrderGuest, initiateOrder, initiateGuestCart, isTokenAdmin } from '../axios-services';
import {
	TextField,
	Button,
	InputLabel,
	Select,
	MenuItem,
	Paper,
} from '@mui/material';
import './SingleProductPage.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SingleProductView = (props) => {
	let navigate = useNavigate();
	const { id } = useParams();
	const [product, setProduct] = useState({});
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [category, setCategory] = useState('');
	const [img, setImg] = useState('');
	const [stock, setStock] = useState('');
	const [open, setOpen] = useState(false);
	const [loggedInUser, setLoggedInUser] = useState({});
	const [order, setOrder] = useState();
	const [isAdmin, setIsAdmin] = useState(false);
	const edit = props.edit;
	const token = props.token;

	const submitHandler = async (evt) => {
		evt.preventDefault();
		try {
			editProduct(
				token,
				product.id,
				name,
				description,
				price,
				category,
				img,
				stock
			).then(() => {
				setOpen(true);
				setTimeout(function () {
					setOpen(false);
				}, 3000);
			});
		} catch (error) {
			throw error;
		}
	};

	useEffect(() => {
		
			if (localStorage.token && localStorage.username) {
				setLoggedInUser({
					token: localStorage.token,
					username: localStorage.username,
				});
				initiateOrder(localStorage.token)
					.then(res => {
						setOrder(res)
					})
				isTokenAdmin(localStorage.token)
				.then(res => {
					if (res === 'User is an authorized admin'){
						setIsAdmin(true);
					} else {
						setIsAdmin(false);
					}
				})
				} else {
					initiateGuestCart()
					.then(res => {
						setOrder(res)
					})
				}
	
		getProductById(id).then((res) => {
			setProduct(res);
			if (edit) {
				setName(res.name);
				setDescription(res.description);
				setPrice(res.price);
				setCategory(res.category);
				setImg(res.img);
				setStock(res.quantity);
			}
			if (!res.id) {
				navigate(-1);
			}
		});
	
	}, []);

	const handleClose = (event) => {
		setOpen(false);
	};

	const handleAddToCart = (e) => {

		if (loggedInUser.token){
			addProductToOrder(product, order, loggedInUser.token)
		} else {
			addProductToOrderGuest(product)
		}
		

		if (!edit) {
			setOpen(true)
			setTimeout(function(){ setOpen(false)}, 1500);
		}
		
	};

	return (
		<div id='single-product'>
			<img src={product.img} alt={product.name} />
			<div className='product-info'>
				<Paper sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, .8)' }}>
					{!edit ? (
						<>
							<h2>
								{product.name} ${product.price}
							</h2>
							<h3>{product.description}</h3>
							<Button onClick={(e) => handleAddToCart(e)} variant='contained'>
								Add to cart
							</Button>{' '}
						</>
					) : (
						<>
							<TextField
								sx={{ mb: 2 }}
								id='outlined-required'
								label='Name'
								variant='outlined'
								value={name}
								onChange={(evt) => setName(evt.target.value)}
							/>
							<br />
							<TextField
								sx={{ mb: 2 }}
								id='outlined-required'
								label='Description'
								variant='outlined'
								value={description}
								onChange={(evt) =>
									setDescription(evt.target.value)
								}
							/>
							<br />
							<TextField
								sx={{ mb: 2 }}
								id='outlined-required'
								label='Price'
								variant='outlined'
								value={price}
								onChange={(evt) => setPrice(evt.target.value)}
							/>
							<br />
							<TextField
								sx={{ mb: 2 }}
								id='outlined-required'
								label='Image Url'
								variant='outlined'
								value={img}
								onChange={(evt) => setImg(evt.target.value)}
							/>
							<br />
							<TextField
								sx={{ mb: 2 }}
								id='outlined-required'
								label='Stock/Quantity'
								variant='outlined'
								value={stock}
								onChange={(evt) => setStock(evt.target.value)}
							/>
							<br />
							<InputLabel id='outlined-required'>
								Category
							</InputLabel>
							<Select
								labelId='category-select'
								id='outline-required'
								value={category}
								label='Category'
								autoWidth={true}
								onChange={(evt) =>
									setCategory(evt.target.value)
								}
							>
								<MenuItem value={'beer'}>Beer</MenuItem>
								<MenuItem value={'wine'}>Wine</MenuItem>
								<MenuItem value={'spirit'}>Spirit</MenuItem>
							</Select>
							<br />
							<Button
								variant='contained'
								onClick={submitHandler}
								type='submit'
								sx={{ mt: 2 }}
							>
								Save Changes
							</Button>
						</>
					)}
					<br />
					{edit ? (
						<Button
							variant='contained'
							onClick={submitHandler}
							type='submit'
							color='warning'
							sx={{ mt: 2 }}
						>
							Delete Product
						</Button>
					) : null}
				</Paper>
			</div>

			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				open={open}
				autoHideDuration={6000}
				onRequestClose={handleClose}
			>
				<Alert
					onRequestClose={handleClose}
					severity='success'
					sx={{ width: '100%' }}
				>
					{edit ? 'Changes Saved' : 'Added to Cart'}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default SingleProductView;

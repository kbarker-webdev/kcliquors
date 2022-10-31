import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { addProductToOrder, addProductToOrderGuest, getAllProducts, initiateOrder, initiateGuestCart, isTokenAdmin } from '../axios-services';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



const Products = (props) => {
	const [products, setProducts] = useState([]);
	const [loggedInUser, setLoggedInUser] = useState({});
	const [order, setOrder] = useState();
	const [isAdmin, setIsAdmin] = useState(false);
	const category = props.category;
	const edit = props.edit
	const [open, setOpen] = useState(false);

	useEffect(() => {
			getAllProducts(category)
			.then(res => {
				setProducts(res)
			});

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
	}, [category]);

	const handleEdit = (e) => {
		
	}

	const handleMouseEnter = (e) => {
		e.target.parentNode.parentNode.parentNode.className +=
			' hovered-product';
	};

	const handleMouseLeave = (e) => {
		e.target.parentNode.parentNode.parentNode.className = '';
	};

	const handleMouseEnterButton = (e) => {
		e.target.parentNode.parentNode.className += ' hovered-product';
	};

	const handleMouseLeaveButton = (e) => {
		e.target.parentNode.parentNode.className = '';
	};

	const handleClose = (event) => {
		setOpen(false);
	  };

	const handleAddToCart = (e) => {
		let currItem = products[e.target.id];

		if (loggedInUser.token){
			addProductToOrder(currItem, order, loggedInUser.token)
		} else {
			addProductToOrderGuest(currItem)
		}
		
		// edit ? setProductLink('/products/edit/') : setProductLink('/products/');

		if (!edit) {
			setOpen(true)
			setTimeout(function(){ setOpen(false)}, 3000);
		}
		
	};

	return (
		<div>
			<ul className='product-list'>
				{products.map((product, index) => {
					return (
						<li id={product.id} key={product.id}>
							<div className='product'>
								<Link to={`${product.id}`}>
									<img
										src={product.img}
										alt={`${product.name}`}
										height='200px'
										className='product-img'
										onMouseEnter={handleMouseEnter}
										onMouseLeave={handleMouseLeave}
									/>
								</Link>
								{edit ? 
								<Button
									id={index}
									variant='contained'
									onMouseEnter={handleMouseEnterButton}
									onMouseLeave={handleMouseLeaveButton}
									onClick={handleEdit}
								>
									Edit
								</Button> : 
								<Button
									id={index}
									variant='contained'
									onMouseEnter={handleMouseEnterButton}
									onMouseLeave={handleMouseLeaveButton}
									onClick={handleAddToCart}
								>
									Add to cart
								</Button>}
								<h2>${product.price}</h2>
								<h4>{product.name}</h4>
							</div>
						</li>
					);
				})}
			</ul>
			<Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={handleClose}>
  				<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
    				Product Added to Cart
  				</Alert>
			</Snackbar>
		</div>
	);
};
export default Products;

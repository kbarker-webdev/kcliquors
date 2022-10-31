import React, { useEffect, useState } from 'react';
import { Button, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
	addProductToOrder_Cart,
	addProductToOrderGuest,
	getAllProductsOnOrder,
	getAllProductsOnOrderGuest,
	removeProductFromOrder,
	removeProductFromOrderGuest,
} from '../axios-services';
import { useNavigate } from 'react-router-dom';
import Checkout from './Checkout';

const Cart = (props) => {
	// const [order, setOrder] = useState();
	const [total, setTotal] = useState(0);
	const order = props.order;
	const cart = props.cart;
	const setCart = props.setCart;
	const navigate = useNavigate();

	const handleDelete = (e, product) => {
		if (localStorage.token) {
			removeProductFromOrder(order, product.product_id).then((res) => {
				getAllProductsOnOrder(order.id).then((resProds) => {
					setCart(resProds);
					setTotal(totalPrice);
				});
			});
		} else {
			removeProductFromOrderGuest(product.product_id).then((res) => {
				getAllProductsOnOrderGuest().then((resProds) => {
					setCart(resProds);
					setTotal(totalPrice);
				});
			});
		}
	};

	const handleAdd = (e, product) => {
		if (localStorage.token) {
			addProductToOrder_Cart(product, order, localStorage.token).then(
				(res) => {
					getAllProductsOnOrder(order.id).then((resProds) => {
						setCart(resProds);
						setTotal(totalPrice);
					});
				}
			);
		} else {
			const prod = {
				id: product.product_id,
				name: product.product_name,
				price: product.price_at_purchase,
			};
			addProductToOrderGuest(prod).then((res) => {
				getAllProductsOnOrderGuest().then((resProds) => {
					setCart(resProds);
					setTotal(totalPrice);
				});
			});
		}
	};

	useEffect(() => {
		if (order === undefined) {
			navigate('/');
			return;
		}

		if (localStorage.token) {
			getAllProductsOnOrder(order.id).then((res) => {
				setCart(res);
			});
		} else {
			getAllProductsOnOrderGuest().then((res) => {
				setCart(res);
			});
		}
	}, []);

	useEffect(() => {
		setTotal(totalPrice);
	}, [cart]);

	const totalPrice = () => {
		try {
			let total = 0;
			for (const item of cart) {
				total += item.price_at_purchase * item.quantity_order;
			}
			return total.toFixed(2);
		} catch (error) {
			throw error;
		}
	};

	const handleCheckout = () => {
		navigate('/checkout');
	};

	return (
		<div className='cart-area'>
			<Paper sx={{padding: 3, backgroundColor: 'rgba(255, 255, 255, .8)'}}>
				<h2 style={{ textAlign: 'center' }}>Cart</h2>
				<table>
					<tr>
						<th>Item</th>
						<th>Quantity</th>
						<th>Price</th>
					</tr>
					{cart
						? cart.map((item) => (
								<tr key={item.product_name} id={item.id}>
									<td>{item.product_name}</td>
									<td style={{ textAlign: 'center' }}>
										{item.quantity_order}
									</td>
									<td>
										{(
											item.price_at_purchase *
											item.quantity_order
										).toFixed(2)}
									</td>
									<td>
										<IconButton
											onClick={(e) => handleAdd(e, item)}
											id={item.product_id}
											style={{ color: '#28B463' }}
										>
											<AddIcon></AddIcon>
										</IconButton>

										<IconButton
											onClick={(e) =>
												handleDelete(e, item)
											}
											id={item.product_id}
											style={{ color: '#D35400' }}
										>
											<RemoveIcon></RemoveIcon>
										</IconButton>
									</td>
								</tr>
						  ))
						: null}
					<tr>
						<td>
							<b style={{ textAlign: 'center' }}>Total</b>
						</td>
						<td></td>
						<td>{total}</td>
					</tr>
				</table>
				<br />
				<Button
					id='checkout-btn'
					variant='contained'
					onClick={handleCheckout}
				>
					Checkout
				</Button>
			</Paper>
		</div>
	);
};

export default Cart;

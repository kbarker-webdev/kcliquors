import React, { useState } from 'react';
import {
	TextField,
	Button,
	InputLabel,
	Select,
	MenuItem,
	Paper,
} from '@mui/material';
import { createProduct } from '../axios-services';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const CreatingProd = (props) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [category, setCategory] = useState('');
	const [img, setImg] = useState('');
	const [stock, setStock] = useState('');
	const [open, setOpen] = useState(false);
	const token = props.token;


	const submitHandler = async (evt) => {
		evt.preventDefault();
		try {
			createProduct(
				token,
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

	const handleClose = (event) => {
		setOpen(false);
	};

	return (
		<div>
			<br />
			<Paper
				variant='outlined'
				sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
			>
				<h3 style={{ textAlign: 'center' }}>Create a product:</h3>
				<form onSubmit={submitHandler}>
					<TextField
						id='outlined-required'
						label='Name'
						variant='outlined'
						value={name}
						onChange={(evt) => setName(evt.target.value)}
					/>
					<br />
					<TextField
						id='outlined-required'
						label='Description'
						variant='outlined'
						value={description}
						onChange={(evt) => setDescription(evt.target.value)}
					/>
					<br />
					<TextField
						id='outlined-required'
						label='Price'
						variant='outlined'
						value={price}
						onChange={(evt) => setPrice(evt.target.value)}
					/>
					<br />
					<InputLabel id='outlined-required'>Category</InputLabel>
					<Select
						labelId='category-select'
						id='outline-required'
						value={category}
						label='Category'
						onChange={(evt) => setCategory(evt.target.value)}
					>
						<MenuItem value={'beer'}>Beer</MenuItem>
						<MenuItem value={'wine'}>Wine</MenuItem>
						<MenuItem value={'spirit'}>Spirit</MenuItem>
					</Select>
					<br />
					<TextField
						id='outlined-required'
						label='Image Url'
						variant='outlined'
						value={img}
						onChange={(evt) => setImg(evt.target.value)}
					/>
					<br />
					<TextField
						id='outlined-required'
						label='Stock/Quantity'
						variant='outlined'
						value={stock}
						onChange={(evt) => setStock(evt.target.value)}
					/>
					<br />
					<Button
						variant='contained'
						onClick={submitHandler}
						type='submit'
					>
						Add Product
					</Button>
				</form>
			</Paper>
			<br />
			<br />
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
					Product Added
				</Alert>
			</Snackbar>
		</div>
	);
};
export default CreatingProd;

import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
	return (
		<div>
			<a href='/'>
				<Link className='section-container' to='/admin/viewusers'>
					<h1>View All Users</h1>
				</Link>
			</a>
			<Link className='section-container' to='/admin/createnewproduct'>
				<h1>Create New Product</h1>
			</Link>
			<Link className='section-container' to='/admin/editproduct'>
				<h1>Edit Products</h1>
			</Link>
		</div>
	);
};

export default Admin;
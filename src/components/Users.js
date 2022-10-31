import { Paper } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../axios-services';

const Users = (props) => {
	const [users, setUsers] = useState([]);

	const token = props.token;

	useEffect(() => {
		getAllUsers(token).then((res) => {
			console.log(res);
			setUsers(res);
		});
	}, []);

	return (
		<div>
			<Paper>
				<table>
					{users ? (
						<tr>
							<th>Username</th>
							<th>Email</th>
							<th>Is Admin?</th>
						</tr>
					) : null}
					{users ? (
						users.map((user) => {
							return (
								<tr key={user.username} id={user.id}>
									<td>{user.username}</td>
									<td>{user.email}</td>
									<td>{user.is_admin ? 'TRUE' : 'FALSE'}</td>
								</tr>
							);
						})
					) : (
						<h2>You are not authorized to access this page.</h2>
					)}
				</table>
			</Paper>
		</div>
	);
};
export default Users;

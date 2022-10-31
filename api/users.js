const express = require('express');
const usersRouter = express.Router();
const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const {
	createUser,
	getAllUsers,
	getUserByUsername,
	getUser,
	getUserByEmail,
} = require('../db/models/users');
const {requireAdmin} = require('./utils');

usersRouter.get('/', requireAdmin, async (req, res, next) => {
		try{
			const users = await getAllUsers();
			res.send({
				users,
			});
		} catch (error) {
			next (error);
		}
	}
);	

usersRouter.get('/admin', requireAdmin, async (req, res, next) => {
	try {
		res.send('User is an authorized admin')
	} catch (error) {
		next (error)
	}
})

usersRouter.post('/login', async (req, res, next) => {
	const { username, password } = req.body;

	if (!username || !password) {
		next({
			name: 'MissingCredentialsError',
			message: 'Please provide a username and password',
		});
	}
	try {
		const user = await getUser({ username, password });
		if (user) {
			const token = jwt.sign(user, process.env.JWT_SECRET, {
				expiresIn: '1w',
			});
			res.send({
				message: 'You are logged in.',
				token,
				user,
			});
		} else {
			next({
				name: 'IncorrectCredentialsError',
				message: 'Username or password is incorrect',
			});
		}
	} catch (error) {
		next(error);
	}
});

usersRouter.post('/register', async (req, res, next) => {
	const { username, password, email, is_admin } = req.body;

	try {
		const _user = await getUserByUsername(username);
		const __user = await getUserByEmail(email);

		if (_user) {
			next({
				name: 'UserExistsError',
				message: `Username ${username} already exists`,
			});
		}
		if (__user) {
			next({
				name: 'EmailExistsError',
				message: `An account already exists with the email ${email}`,
			});
		}

		const user = await createUser({
			username,
			password,
			email,
			is_admin,
		});

		const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '1w' });
		res.send({
			message: 'You are now registered.',
			token,
			user: user,
		});
	} catch ({ name, message }) {
		next({ name, message });
	}
});

module.exports = usersRouter;

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div>
			<a href='/'>
				<Link className='section-container' to='/products/wine'>
					<h1>Wine</h1>
				</Link>
			</a>
			<Link className='section-container' to='/products/spirits'>
				<h1>Liquor</h1>
			</Link>
			<Link className='section-container' to='/products/beer'>
				<h1>Beer</h1>
			</Link>
		</div>
	);
};

export default Home;

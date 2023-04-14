import React from 'react';
import { Link } from 'react-router-dom';
import imgWelcome from '../assets/beere.gif';

const Welcome = () => {
	return (
		<section className="flex flex-col justify-center text-center items-center m-auto">
			<img src={imgWelcome} alt="ImgWelcome" />
			<h2 className="text-2xl font-medium items-center">Recipe App</h2>
			<h1 className="md:text-4xl text-3xl font-semibold items-center py-5">
				Explore and get to know a world of snacks for you
			</h1>

			<Link to="/login" className="text-xl">
				<button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
					Log on
				</button>
			</Link>
		</section>
	);
};

export default Welcome;

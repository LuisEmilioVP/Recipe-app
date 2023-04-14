import React, { useState } from 'react';
import { useAuth } from '../contexts/authContex';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const [error, setError] = useState(null);

	const { signup } = useAuth();
	const navigate = useNavigate();

	const handleChange = ({ target: { name, value } }) => {
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		try {
			await signup(user.email, user.password);
			toast.success('Successfully logged in! 😃');
			navigate('/home');
		} catch (error) {
			if (error.code === 'auth/invalid-email') {
				setError(toast.error('Invalid e-mail 🥵'));
			} else if (error.code === 'auth/weak-password') {
				setError(toast.error('Password must be longer than 6 characters 🥵'));
			} else if (error.code === 'auth/email-already-in-use') {
				setError(toast.error('This e-mail already exists 🥵'));
			} else {
				setError(toast.error('An error has occurred!🥵'));
			}
		}
	};

	return (
		<div className="w-full max-w-xs m-auto">
			<form
				onSubmit={handleSubmit}
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-cyan-700"
			>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="email"
					>
						Email
					</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="example@ex.com"
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>

				<div className="mb-6">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="password"
					>
						Password
					</label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="*******"
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>

				<div className="flex flex-col items-center">
					<button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
						Signup
					</button>

					<Link
						to="/login"
						className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 my-2"
					>
						Login
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Register;

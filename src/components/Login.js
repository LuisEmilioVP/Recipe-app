import React, { useState } from 'react';
import { useAuth } from '../contexts/authContex';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const { login, loginWithGoogle, resetPassword } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState(null);

	const handleChange = ({ target: { name, value } }) => {
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		try {
			await login(user.email, user.password);
			toast.success('Welcome to your recipe app! 🧆');
			navigate('/home');
		} catch (error) {
			if (error.code === 'auth/user-not-found') {
				setError(toast.error('This email does not exist! 🥵'));
			} else if (error.code === 'auth/wrong-password') {
				setError(toast.error('Invalid password! 🥵'));
			} else {
				setError(toast.error('An error has occurred! 🥵'));
			}
			console.log(error.code);
		}
	};

	const handleGoogle = async () => {
		try {
			await loginWithGoogle();
			setError(toast.success('Welcome to your recipe app! 🧆'));
			navigate('/home');
		} catch (error) {
			setError(toast.error('An error has occurred! 🥵'));
		}
	};

	const handleResetPassword = async () => {
		if (!user.email) return toast.warning('Enter an Email');
		try {
			await resetPassword(user.email);
			setError(
				toast.success(
					'We have sent you an email to reset your password. Check your Spam folder! 📩'
				)
			);
		} catch (error) {
			if (error.code === 'auth/user-not-found') {
				setError(toast.error('Unregistered mail! 🥵'));
			} else {
				setError(toast.error('An error has occurred!🥵'));
				console.log(error.message);
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
						Login
					</button>

					<p className="text-gray-700 my-0.5">Don't have an account yet?</p>

					<Link
						to="/register"
						className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 my-2"
					>
						Register now 😎
					</Link>

					<Link
						to="#"
						className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 my-0.5"
						onClick={handleResetPassword}
					>
						Forgot your password?
					</Link>
				</div>
			</form>

			<div className="flex flex-col tems-center text-center">
				<button
					onClick={handleGoogle}
					className="bg-transparent  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent py-2 px-4 rounded inline-flex items-center"
				>
					<svg
						className="fill-current w-5 h-5 mr-2"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
					>
						<path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
					</svg>
					<span>Start Google Section</span>
				</button>

				<Link to="/">
					<button className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full my-3">
						Close App
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Login;

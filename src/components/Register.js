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
			toast.success('¡Usuario registrado con éxito! 😃');
			navigate('/home');
		} catch (error) {
			if (error.code === 'auth/invalid-email') {
				setError(toast.error('Correo inválido 🥵'));
			} else if (error.code === 'auth/weak-password') {
				setError(toast.error('La contraseña debe tener más de 6 caracteres 🥵'));
			} else if (error.code === 'auth/email-already-in-use') {
				setError(toast.error('Este correo ya existe 🥵'));
			} else {
				setError(toast.error('¡Ha ocurrido un error! 🥵'));
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
						placeholder="ejemplo@je.com"
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>

				<div className="mb-6">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="password"
					>
						Contraseña
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
						Registrar
					</button>

					<Link
						to="/login"
						className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 my-2"
					>
						Iniciar Sección
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Register;

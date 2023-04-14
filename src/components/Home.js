import { useState } from 'react';
import { useAuth } from '../contexts/authContex';
import { toast } from 'react-toastify';

const Home = () => {
	const { user, logout } = useAuth();
	const [error, setError] = useState(null);

	const handleLogout = async () => {
		try {
			await logout();
			setError(toast.success('¡Gracias por visitar Recipe-App! 👌'));
		} catch (error) {
			setError(toast.error('¡Ha ocurrido un error! 🥵'));
		}
	};

	console.log(user);

	return (
		<div>
			<h1>Welcome: {user.displayName || user.email}</h1>

			<button onClick={handleLogout}>Cerrar Sección</button>
		</div>
	);
};

export default Home;

import { useState } from 'react';
import { useAuth } from '../contexts/authContex';
import { toast } from 'react-toastify';

const NavBar = () => {
	const { user, logout } = useAuth();
	const [error, setError] = useState(null);

	const handleLogout = async () => {
		try {
			await logout();
			setError(toast.success('Thanks for visiting Recipe-App! 👌'));
		} catch (error) {
			setError(toast.error('An error has occurred! 🥵'));
		}
	};

	return (
		<div className="w-full  h-1/26">
			<ul className="flex justify-between">
				<li className="ml-40 py-2 px-3">
					<h1 className="font-bold text-2xl">Welcome</h1>
				</li>
				<li className="mr-3 py-2 px-3">
					<h2 className="font-bold text-xl text-gray-400">
						{user.displayName || user.email}
					</h2>
				</li>
				<li className="mr-20">
					<button
						onClick={handleLogout}
						className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-3 rounded-full my-3"
						href="#"
					>
						Logout
					</button>
				</li>
			</ul>
		</div>
	);
};

export default NavBar;

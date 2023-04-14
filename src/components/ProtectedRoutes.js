import { useAuth } from '../contexts/authContex';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
	const { user, loading } = useAuth();

	if (loading)
		return (
			<div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3">
				<h1 className="text-xl">Loading...</h1>
			</div>
		);
	if (!user) return <Navigate to="/login" />;

	return <>{children}</>;
}

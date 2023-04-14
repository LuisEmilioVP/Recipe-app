import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { ProtectedRoute } from './components/ProtectedRoutes';
import { AuthProvider } from './contexts/authContex';
import './index.css';

function App() {
	return (
		<>
			{/* Aletrs Modal */}
			<ToastContainer position="top-center" />
			{/* Aletrs Modal */}

			{/* Components */}
			<div className="h-screen flex flex-col">
				<AuthProvider>
					<Routes>
						<Route path="/" element={<Welcome />} />
						<Route
							path="/home"
							element={
								<ProtectedRoute>
									<Home />
								</ProtectedRoute>
							}
						/>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</AuthProvider>
			</div>
			{/* Components */}
		</>
	);
}

export default App;

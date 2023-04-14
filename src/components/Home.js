import Navbar from './Navbar';
import Homepages from '../pages/homepages/index';

const Home = () => {
	return (
		<>
			<Navbar />

			{/* Home Componects*/}
			<div className="Recipes_Style">
				<Homepages />
			</div>
		</>
	);
};

export default Home;

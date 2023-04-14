import { useEffect, useReducer, useState } from 'react';
import './styles.css';
import Search from '../../components/search';
import RecipeItems from '../../components/recipes-items';
import { toast } from 'react-toastify';
import FavoriteItems from '../../components/favorite-items';

const dummyData = 'dummydata';
const reducer = (state, action) => {
	switch (action.type) {
		case 'filterFavorites':
			return {
				...state,
				filteredValue: action.value,
			};

		default:
			return state;
	}
};

const initialState = {
	filteredValue: '',
};

const Homepages = () => {
	//* loading state
	const [loadingState, setLoadingState] = useState(false);

	//* save results that we receive from api
	const [recipes, setRecipes] = useState([]);

	//* favorite data state
	const [favorites, setFavories] = useState([]);
	//* state for api is succefull or not
	const [apiColledSuccess, setApiColledSuccess] = useState(false);

	//* use reducer functionality
	const [filteredState, dispatch] = useReducer(reducer, initialState);

	const getDataFrom = (getData) => {
		/* keep the loading state as true before we are calling the api */
		setLoadingState(true);

		//* calling the api
		async function getRecipes() {
			const apiResponse = await fetch(
				`https://api.spoonacular.com/recipes/complexSearch?apiKey=9586f27ef9af4ba591c927ff03aa3cfe&query=${getData}`
			);
			const result = await apiResponse.json();
			const { results } = result;

			if (results && results.length > 0) {
				//* set loading staet as false again
				setLoadingState(false);
				//* set the recipes state
				setRecipes(results);
				setApiColledSuccess(true);
			}
		}

		getRecipes();
	};

	//* Add favorite recipes
	const addToFavorites = (getCurrentRecipeItem) => {
		let copyFaforites = [...favorites];

		const index = copyFaforites.findIndex(
			(items) => items.id === getCurrentRecipeItem.id
		);

		if (index === -1) {
			copyFaforites.push(getCurrentRecipeItem);
			setFavories(copyFaforites);
			toast.success('Added to fovoritos 🎇');
			//* Save the favorites in local stroage
			localStorage.setItem('favoriteItem', JSON.stringify(copyFaforites));
		} else {
			toast.error('Item is already present in favorites 🥵');
		}
	};

	//* Remove Favorite Items
	const removeFromFavorites = (getCurrentId) => {
		let copyFaforites = [...favorites];
		copyFaforites = copyFaforites.filter((items) => items.id !== getCurrentId);

		setFavories(copyFaforites);
		localStorage.setItem('favoriteItem', JSON.stringify(copyFaforites));
	};

	useEffect(() => {
		const extractInfoLocalStoreOnPage = JSON.parse(
			localStorage.getItem('favoriteItem')
		);
		setFavories(extractInfoLocalStoreOnPage);
	}, []);

	//* filter the favorites
	const filteredFavoriteItems = favorites.filter((items) =>
		items.title.toLowerCase().includes(filteredState.filteredValue)
	);

	return (
		<div className="homepage">
			<Search
				getDataFrom={getDataFrom}
				dummyDataCopy={dummyData}
				apiColledSuccess={apiColledSuccess}
				setApiColledSuccess={setApiColledSuccess}
			/>

			{/* Show Favorites items */}
			<div className="fovorites_wrapper">
				<h1 className="fovorite_title">Fovorites</h1>

				<div className="search">
					<input
						type="text"
						name="searchfavorites"
						onChange={(event) =>
							dispatch({ type: 'filterFavorites', value: event.target.value })
						}
						value={filteredState.filteredValue}
						placeholder="Search Favorites"
						className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin mr-2 w-72"
					/>
				</div>

				<div className="container">
					{filteredFavoriteItems && filteredFavoriteItems.length > 0
						? filteredFavoriteItems.map((items) => (
								<FavoriteItems
									key={items.id}
									image={items.image}
									title={items.title}
									removeFromFavorites={() => removeFromFavorites(items.id)}
								/>
						  ))
						: null}
				</div>
			</div>
			{/* Show Favorites items */}

			{/* Show loading state */}
			{loadingState && (
				<div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3">
					<h1 className="text-xl">Loading recipes ! Please wait.</h1>
				</div>
			)}
			{/* Show loading state */}

			{/* map through all the recipes */}
			<div className="felx_recipes">
				<h1 className="fovorite_title">Found Recipes</h1>
				<div className="container">
					{recipes && recipes.length > 0
						? recipes.map((items) => (
								<RecipeItems
									key={items.id}
									image={items.image}
									title={items.title}
									addToFavorites={() => addToFavorites(items)}
								/>
						  ))
						: null}
				</div>
			</div>

			{/* map through all the recipes */}
		</div>
	);
};

export default Homepages;

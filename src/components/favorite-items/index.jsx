import './FavoriteItem.css';
const FavoriteItems = (props) => {
	const { id, image, title, removeFromFavorites } = props;

	return (
		<div key={id} className="Favoritecard">
			{/* image */}
			<img src={image} alt="Image-Item" />
			{/* title */}
			<h4>{title}</h4>
			{/* buttom */}
			<button
				type="button"
				onClick={removeFromFavorites}
				className="bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-800 hover:border-red-500 rounded"
			>
				Remove from favorites
			</button>
		</div>
	);
};

export default FavoriteItems;

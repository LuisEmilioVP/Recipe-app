const RecipeItems = (props) => {
	const { id, image, title, addToFavorites } = props;

	return (
		<div key={id} className="card">
			{/* image */}
			<img src={image} alt="Image-Item" />
			{/* title */}
			<h4>{title}</h4>
			{/* buttom */}
			<button
				type="button"
				onClick={addToFavorites}
				className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
			>
				Add to favorites
			</button>
		</div>
	);
};

export default RecipeItems;

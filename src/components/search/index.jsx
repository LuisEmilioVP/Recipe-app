import { useEffect, useState } from 'react';

const Search = (props) => {
	const { getDataFrom, apiColledSuccess, setApiColledSuccess } = props;
	const [inputValue, setInputValue] = useState('');

	const handleInputValue = (event) => {
		const { value } = event.target;
		//* set the update state
		setInputValue(value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		getDataFrom(inputValue);
	};

	useEffect(() => {
		if (apiColledSuccess) {
			setInputValue('');
			setApiColledSuccess(false);
		}
	}, [apiColledSuccess]);

	return (
		<form onSubmit={handleSubmit} className="search">
			<input
				type="text"
				name="search"
				onChange={handleInputValue}
				value={inputValue}
				placeholder="Search Recipes"
				className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin mr-2 w-72"
			/>

			<button
				type="submit"
				className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
			>
				Search
			</button>
		</form>
	);
};

export default Search;

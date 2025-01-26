"use client";

import { useState } from "react";


interface SearchProps {
	onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
	const [query, setQuery] = useState("");

	const handleSearch = () => {
		if (query.trim()) {
			onSearch(query.trim());
		}
	}

	return (
		<div className="flex items-center w-full gap-4 p-4">
			<input
				type="text"
				className="w-full h-14 pl-6 rounded-lg placeholder-purple-500 outline-none bg-transparent border-purple-400 border-2"
				value={query}
				placeholder="Search for NASA images (e.g., Jupiter, Apollo)"
				onChange={(e) => setQuery(e.target.value)}
			/>

			<button
				className="w-24 h-14 rounded-lg text-purple-500 border-purple-400 disabled:text-gray-700 disabled:border-gray-700 border-2"
				onClick={handleSearch}
			>
				Search
			</button>
		</div>
	);
}

export default Search;

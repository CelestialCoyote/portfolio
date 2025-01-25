"use client";

import { useState } from "react";


interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (query.trim()) {
            onSearch(query.trim());
        }
    }

    return (
        <div className="flex items-center gap-4 p-4">
            <input
                type="text"
                className="flex-1 text-black p-2 border rounded-lg shadow-md focus:outline-none focus:ring focus:ring-blue-500"
                value={query}
                placeholder="Search for NASA images (e.g., Jupiter, Apollo)"
                onChange={(e) => setQuery(e.target.value)}
            />

            <button
                onClick={handleSearch}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none"
            >
                Search
            </button>
        </div>
    );
}

export default SearchBar;

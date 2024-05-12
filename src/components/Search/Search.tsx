import React, { ChangeEvent } from 'react';
import './Search.css';
import { CgSearchFound } from 'react-icons/cg';

// Define the props type
interface SearchProps {
    onSearch: (term: string) => void;
    searchTerm: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, searchTerm }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        onSearch(term);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-input"
                placeholder="👀 Search"
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
};

export default Search;

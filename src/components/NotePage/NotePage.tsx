import React, { useState } from 'react';
import Search from '../Search/Search';
import NotesList from '../NotesList/NotesList';
import './NotePage.css';

// NotePage component as a functional component using React.FC
const NotePage: React.FC = () => {
    // Typing the state with TypeScript to indicate it's a string
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Adding TypeScript type annotations for the function parameter
    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    return (
        <div className="note-page">
            <Search onSearch={handleSearch} searchTerm={searchTerm} />
            <NotesList searchTerm={searchTerm} />
        </div>
    );
};

export default NotePage;

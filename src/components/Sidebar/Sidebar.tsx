import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { selectTag } from '../../redux/noteSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tags = useSelector((state) => state.notes.tags);
    const selectedTag = useSelector((state) => state.notes.selectedTag);

    const handleTagClick = (tag) => {
        dispatch(selectTag(tag));
        navigate(`/tags/${tag}`);
    };

    const handleAllNotes = () => {
        dispatch(selectTag(''));
    };

    return (
        <div className="sidebar">
            <h1>Keep</h1>
            <div className="sidebar-links">
                <Link to="/" className="link-button" onClick={() => handleAllNotes()}>
                    All Notes
                </Link>
                <Link to="/archives" className="link-button">
                    Archives
                </Link>
                <Link to="/trash" className="link-button">
                    Trash
                </Link>

                {/* <Link to="/trash">Trash</Link> */}
            </div>
            {tags.map((tag, index) => (
                <button key={index} onClick={() => handleTagClick(tag)} className={tag === selectedTag ? 'active' : ''}>
                    {tag}
                </button>
            ))}
        </div>
    );
};

export default Sidebar;

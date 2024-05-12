import React, { useState, FunctionComponent } from "react";
import "./Header.css";
import AddNote from "../AddNote/AddNote";
import { BiMessageSquareAdd } from "react-icons/bi";

const Header: FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCreateNote = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <header className="App-header">
      <h1>MY NOTES</h1>
      <button className="create-note-button" onClick={handleCreateNote}>
        <BiMessageSquareAdd />
      </button>
      {isModalOpen && <AddNote onClose={() => setIsModalOpen(false)} />}
    </header>
  );
};

export default Header;

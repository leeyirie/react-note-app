import React from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import NotePage from "./components/NotePage/NotePage";
import Archives from "./components/Archives/Archives";
import Trash from "./components/Trash/Trash";
import TaggedNotePage from "./components/TaggedNotePage/TaggedNotePage";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-tooltip/dist/react-tooltip.css"; //반드시 필요

const App: React.FC = () => {
  return (
    <div className="App">
      <Sidebar />
      <div className="Notes">
        <Header />
        <Routes>
          <Route path="/" element={<NotePage />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/tags/:tag" element={<TaggedNotePage />} />
          <Route path="/trash" element={<Trash />} />
          {/* Optional additional routes could be added here */}
        </Routes>
      </div>
    </div>
  );
};

export default App;

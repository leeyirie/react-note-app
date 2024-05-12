import React from "react";
import { useParams } from "react-router-dom";
import NotesList from "../NotesList/NotesList"; // 노트 목록을 보여주는 컴포넌트
import "./TaggedNotePage.css";

const TaggedNotePage = () => {
  const { tag } = useParams(); // URL에서 태그 파라미터를 가져옴

  return (
    <div className="tagged-page-container">
      <div className="tagged-page">
        <p>Tag: {tag}</p>
      </div>
      <NotesList tag={tag} />
    </div>
  );
};

export default TaggedNotePage;

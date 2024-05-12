import React from "react";
import { useSelector } from "react-redux";
import Note from "../Note/Note";
import "./Archives.css";

const Archives = () => {
  const archivedNotes = useSelector((state) => state.notes.archivedItems ?? []);

  return (
    <div className="archive-container">
      <h2 className="archive-header">Archived Notes</h2>
      <div className="archive-notes">
        {archivedNotes.length > 0 ? (
          archivedNotes.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              tags={note.tags}
              color={note.color}
              createdTime={note.createdTime}
              isPinned={note.isPinned}
              isArchived={note.isArchived}
            />
          ))
        ) : (
          <p>No archived notes.</p>
        )}
      </div>
    </div>
  );
};

export default Archives;

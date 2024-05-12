import React from "react";
import { useSelector } from "react-redux";
import Note from "../Note/Note";
import "./NotesList.css";
import "../../types/NoteType";

// Define the shape of the props that NotesList accepts
interface NotesListProps {
  searchTerm: string;
  tag?: string; // tag is optional
}

// Define the shape of the state that the useSelector hook will interact with
interface RootState {
  notes: {
    items: NoteType[];
  };
}

const NotesList: React.FC<NotesListProps> = ({ searchTerm = "", tag }) => {
  const notes = useSelector((state: RootState) => state.notes.items);

  const filteredNotes = notes.filter((note) => {
    const searchMatch =
      note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const tagMatch = tag ? note.tags?.includes(tag) : true; // 태그 필터링 추가
    return searchMatch && tagMatch;
  });

  // 고정된 노트와 그렇지 않은 노트
  const pinnedNotes = filteredNotes.filter((note) => note.isPinned);
  const unpinnedNotes = filteredNotes.filter((note) => !note.isPinned);

  return (
    <div className="notes-list">
      <h2>Pinned Notes ({pinnedNotes.length})</h2>

      <div className="pinned-notes-section">
        {pinnedNotes.map((note) => (
          <Note
            {...note}
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
        ))}
      </div>
      <h2>All Notes ({unpinnedNotes.length})</h2>
      <div className="unpinned-notes-section">
        {unpinnedNotes.map((note) => (
          <Note
            {...note}
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
        ))}
      </div>
    </div>
  );
};

// Providing default props in case they are not passed to the component
NotesList.defaultProps = {
  searchTerm: "",
};

export default NotesList;

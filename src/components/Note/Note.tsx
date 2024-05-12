import React from "react";
import { useDispatch } from "react-redux";
import { PiArchiveBoxBold } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdPushPin } from "react-icons/md";
import { removeNote, archiveNote, togglePinNote } from "../../redux/noteSlice";
import "./Note.css";
import dayjs from "dayjs";

// Define the props interface
interface NoteProps {
  title: string;
  content: string;
  color: string;
  tags: string[];
  createdTime: string;
  id: string;
  isPinned: boolean;
}

const Note: React.FC<NoteProps> = ({
  title,
  content,
  color,
  tags,
  createdTime,
  id,
  isPinned,
}) => {
  const dispatch = useDispatch();

  const handlePinToggle = () => {
    dispatch(togglePinNote(id));
  };

  const noteStyle = {
    backgroundColor: color,
    color: "#000", // 텍스트의 색상
  };

  const handleDelete = () => {
    dispatch(removeNote(id));
  };

  const handleArchive = () => {
    dispatch(archiveNote(id));
  };

  const formattedTime = dayjs(createdTime).format("YYYY/MM/DD ddd HH:mm");

  return (
    <div className="note" style={noteStyle}>
      <div className="note-header">
        <h3>{title}</h3>
        <button onClick={handlePinToggle} className="note-button">
          <MdPushPin style={{ color: isPinned ? "red" : "grey" }} />
        </button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      {tags && tags.length > 0 && (
        <div className="tags-list">
          <p>Tags: </p>
          {tags.map((tag, index) => (
            <span key={index} className="tags-list-item">{`${tag}${
              index < tags.length - 1 ? " " : ""
            }`}</span>
          ))}
        </div>
      )}
      <div className="options">
        <div className="created-time">{formattedTime}</div>
        <button onClick={handleDelete} className="note-button">
          <RiDeleteBin6Line
            style={{ fontSize: "18px", margin: "0", padding: "0" }}
          />
        </button>
        <button onClick={handleArchive} className="note-button">
          <PiArchiveBoxBold
            style={{ fontSize: "18px", margin: "0", padding: "0" }}
          />
        </button>
      </div>
    </div>
  );
};

export default Note;

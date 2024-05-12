import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { emptyTrash, restoreFromTrash, deleteNoteInTrash } from '../../redux/noteSlice';
import Note from '../Note/Note';
import './Trash.css';

const Trash: React.FC = () => {
    const dispatch = useDispatch();
    const trashNotes = useSelector((state: any) => state.notes.trash); // Use any or a specific inferred type if known

    const handleEmptyTrash = () => {
        if (window.confirm('전체 노트를 완전히 삭제 하시겠습니까?')) {
            dispatch(emptyTrash());
        }
    };

    const handleDeleteOneNote = (noteId: string) => {
        if (window.confirm('선택한 노트를 완전히 삭제 하시겠습니까?')) {
            dispatch(deleteNoteInTrash(noteId));
        }
    };

    const handleRestoreNote = (noteId: string) => {
        dispatch(restoreFromTrash(noteId));
    };

    return (
        <div className="trash-container">
            <div className="trash-header">
                <h2>Trash</h2>
                {trashNotes.length > 0 ? (
                    <button onClick={handleEmptyTrash} className="empty-trash-button">
                        전체 삭제하기
                    </button>
                ) : null}
            </div>
            {trashNotes.length > 0 ? (
                <div className="trash-notes">
                    {trashNotes.map((note) => (
                        <div key={note.id} className="trash-note">
                            <Note {...note} />
                            <div className="buttons">
                                <button onClick={() => handleRestoreNote(note.id)} className="restore-button">
                                    복원
                                </button>
                                <button onClick={() => handleDeleteOneNote(note.id)} className="restore-button">
                                    삭제
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="empty-message">No notes in Trash.</p>
            )}
        </div>
    );
};

export default Trash;

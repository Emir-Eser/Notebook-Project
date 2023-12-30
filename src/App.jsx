import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedNoteContent, setEditedNoteContent] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim() !== '') {
      setNotes([...notes, { id: uuidv4(), content: newNote }]);
      setNewNote('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (id) => {
    setEditingNoteId(id);
    const noteToEdit = notes.find((note) => note.id === id);
    setEditedNoteContent(noteToEdit.content);
  };

  const saveEditedNote = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === editingNoteId ? { ...note, content: editedNoteContent } : note
      )
    );
    setEditingNoteId(null);
    setEditedNoteContent('');
  };

  return (
    <div className="app-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Add note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button onClick={addNote}>Add</button>
      </div>

      <div className="note-container">
        {notes.map((note) => (
          <div key={note.id} className="note">
            {editingNoteId === note.id ? (
              <>
                <textarea
                  value={editedNoteContent}
                  onChange={(e) => setEditedNoteContent(e.target.value)}
                />
                <button onClick={saveEditedNote}>Save</button>
              </>
            ) : (
              <>
                <div className="note-buttons">
                  <button onClick={() => editNote(note.id)}>Edit</button>
                  <button onClick={() => deleteNote(note.id)}>X</button>
                </div>
                <div className="note-content">{note.content}</div>

              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

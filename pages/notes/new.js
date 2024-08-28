import React from 'react';
import TodoForm from '../../components/notes/NoteForm';
import { useAuth } from '../../utils/context/authContext';

const NewNote = () => {
  const { user } = useAuth();
  return (
    <div className="new-note-container">
      <div className="new-note-content">
        <h2>Create a new Todo</h2>
        <TodoForm user={user} />
      </div>
    </div>
  );
};

export default NewNote;

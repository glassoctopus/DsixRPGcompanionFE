import React from 'react';
import TodoForm from '../../components/notes/NoteForm';
import { useAuth } from '../../utils/context/authContext';
import FancyCardLong from '../../components/character/cards/FancyCardLong';

const NewNote = () => {
  const { user } = useAuth();
  return (

    <div className="new-note-container">

      <div className="new-note-content">
        <FancyCardLong>
          <div className="cardOfForm">
            <h2>Create a new Todo</h2>
            <TodoForm user={user} />
          </div>
        </FancyCardLong>
      </div>

    </div>

  );
};

export default NewNote;

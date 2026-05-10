import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getNotes } from '../../utils/data/noteData';
import { useAuth } from '../../context/AuthContext';
import NoteTable from '../../components/notes/NoteTable';
import FancyButton from '../../components/GUI/FancyButton';

const Note = () => {
  const [notes, setNotes] = useState([]);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait until auth is resolved, then fetch if user is logged in
    if (!loading && user) {
      getNotes()
        .then(setNotes)
        .catch(console.error);
    }
  }, [user, loading]); // dependencies include loading

  const newNote = () => {
    router.push('/notes/new');
  };

  return (
    <div className="note-container">
      <div className="note-content">
        <article className="note">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">note List</h2>

            <FancyButton onClick={newNote}>
              New Note
            </FancyButton>

          </div>
          <NoteTable notes={notes} />
        </article>
      </div>
    </div>
  );
};

export default Note;

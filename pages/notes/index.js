import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getNotes } from '../../utils/data/noteData';
import { useAuth } from '../../utils/context/authContext';
import NoteTable from '../../components/notes/NoteTable';
import FancyButton from '../../components/FancyButton';

const Note = () => {
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.uid) {
      getNotes().then((data) => {
        setNotes(data);
      });
    }
  }, [user]);

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

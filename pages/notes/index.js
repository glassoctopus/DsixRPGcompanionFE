import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getNotes } from '../../utils/data/noteData';
import NoteTable from '../../components/notes/NoteTable';
import { useAuth } from '../../utils/context/authContext';

const Note = () => {
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.uid) {
      getNotes().then((data) => {
        setNotes(data);
      });
    }
  }, [user]);

  return (
    <div className="note-container">
      <div className="note-content">
        <article className="note">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">note List</h2>
            <Link href="/notes/new" passHref>
              <Button variant="primary">
                New Note
              </Button>
            </Link>
          </div>
          <NoteTable notes={notes} />
        </article>
      </div>
    </div>
  );
};

export default Note;

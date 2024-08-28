import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import NoteCard from '../../components/notes/NoteCard';
import { getSingleNote } from '../../utils/data/noteData';

const Note = () => {
  const [item, setitem] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleNote(id).then((data) => setitem(data));
    }
  }, [id]);

  if (!item) {
    return <p>Loading...</p>;
  }

  const handleEdititem = () => {
    router.push(`/notes/update/${id}`);
  };

  return (
    <article className="notes">
      <h1>Note</h1>
      <Button onClick={handleEdititem}>
        Edit this Note
      </Button>

      <section key={`note--${item.id}`} className="note">
        <NoteCard
          title={item.title || 'Untitled note'}
          description={item.description || 'No description available'}
          completed={item.completed ? 'Completed' : 'Incomplete'}
          temporary_field={item.temporary_field ? 'Temporary' : 'Permanent'}
          id={id}
        />
      </section>
    </article>
  );
};

export default Note;

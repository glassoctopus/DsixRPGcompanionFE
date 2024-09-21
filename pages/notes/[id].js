import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NoteCard from '../../components/notes/NoteCard';
import { getSingleNote } from '../../utils/data/noteData';
import FancyCardLong from '../../components/character/cards/FancyCardLong';
import FancyButton from '../../components/FancyButton';

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
    <FancyCardLong>
      <article className="notes">
        <h1>Note</h1>
        <FancyButton onClick={handleEdititem}>
          Edit this Note
        </FancyButton>

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
    </FancyCardLong>
  );
};

export default Note;

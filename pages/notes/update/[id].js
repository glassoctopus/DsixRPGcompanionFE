import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NoteForm from '../../../components/notes/NoteForm';
import { getSingleNote } from '../../../utils/data/noteData';
import FancyCardLong from '../../../components/character/cards/FancyCardLong';

const UpdateTask = () => {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState({});

  useEffect(() => {
    if (id) {
      getSingleNote(id).then(setTask);
    }
  }, [id]);

  return (
    <FancyCardLong>
      <div className="cardOfForm">
        <h2>Update Task</h2>
        {task && <NoteForm noteObject={task} />}
      </div>
    </FancyCardLong>
  );
};

export default UpdateTask;

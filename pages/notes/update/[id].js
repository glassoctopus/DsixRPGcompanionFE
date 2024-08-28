import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NoteForm from '../../../components/notes/NoteForm';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleNote } from '../../../utils/data/noteData';

const UpdateTask = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [task, setTask] = useState({});

  useEffect(() => {
    if (id) {
      getSingleNote(id).then(setTask);
    }
  }, [id]);

  return (
    <div>
      <h2>Update Task</h2>
      {task && <NoteForm user={user} taskObject={task} />}
    </div>
  );
};

export default UpdateTask;

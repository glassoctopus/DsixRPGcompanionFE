import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form, FormLabel } from 'react-bootstrap';
import { createNote, updateNote } from '../../utils/data/noteData';

const initialState = {
  title: '',
  description: '',
  completed: false,
  temporary_field: false,
};

const NoteForm = ({ noteObject }) => {
  const router = useRouter();
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (noteObject && noteObject.id) {
      setFormInput(noteObject);
    }
  }, [noteObject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (noteObject.id) {
      updateNote(noteObject.id, formInput)
        .then(() => router.push('/notes'))
        .catch((error) => {
          console.error('Error updating this note: ', error);
        });
    } else {
      createNote(formInput)
        .then(() => router.push('/notes'))
        .catch((error) => {
          console.error('Error creating this note: ', error);
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <FormLabel>note Title</FormLabel>
        <Form.Control
          type="text"
          placeholder="Title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <FormLabel>Description</FormLabel>
        <Form.Control
          type="text"
          placeholder="Description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Completed"
          name="completed"
          checked={formInput.completed}
          onChange={(e) => setFormInput((prevState) => ({
            ...prevState,
            completed: e.target.checked,
          }))}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

NoteForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  noteObject: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    completed: PropTypes.bool,
    temporary_field: PropTypes.bool,
  }),
};

NoteForm.defaultProps = {
  noteObject: initialState,
};
export default NoteForm;
